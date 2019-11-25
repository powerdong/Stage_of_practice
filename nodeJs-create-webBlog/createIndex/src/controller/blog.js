/*
 * @Author: Lambda
 * @Begin: 2019-10-26 13:50:29
 * @Update: 2019-10-30 15:41:20
 * @Update log: 更新日志
 */

const {
  exec
} = require('../db/mysql')

const xss = require('xss')
/**
 * 获取博客数据
 * @param {*} author 作者名 
 * @param {*} keyword 关键字
 */
const getList = (author, keyword) => {
  // 定义sql语句
  // 其中的 1=1 用来占位 防止报错
  let sql = `select * from blogs where 1=1 `
  if (author) {
    // 如果传了作者信息进行查询
    sql += `and author='${author}' `
  }
  if (keyword) {
    // 如果传了关键字信息
    sql += `and title like '%${keyword}%'`
  }
  // 根据创建时间进行倒序排序
  sql += `order by createtime desc;`
  // 返回 promise
  return exec(sql)


  // // 先返回假数据
  // return [{
  //     id: 1,
  //     title: '标题A',
  //     content: '内容A',
  //     createTime: 15484851115,
  //     author: 'zhangSan'
  //   },
  //   {
  //     id: 2,
  //     title: '标题B',
  //     content: '内容B',
  //     createTime: 154345851115,
  //     author: 'liSi'
  //   }
  // ]
}

const getDetail = id => {
  const sql = `select * from blogs where id='${id}';`
  return exec(sql).then(rows => {
    return rows[0]
  })
}

const newBlog = (blogData = {}) => {
  // blogData 是一个博客对象，包含title，content createtime, author属性
  const title = xss(blogData.title)
  const content = blogData.content
  const author = blogData.author
  const createTime = +new Date()

  const sql = `
    insert into blogs (title, content, createtime, author)
    values ('${title}', '${content}', ${createTime}, '${author}')
  `

  return exec(sql).then(insertData => {
    // console.log('insertData is ', insertData);
    return {
      // 本次插入的id
      id: insertData.insertId
    }
  })

  // return {
  //   id: 3 // 表示新建博客，插入到数据表里面的id
  // }
}

const updateBlog = (id, blogData = {}) => {
  // id 就是要更新博客的 id
  // blogData 是一个博客对象，包含title，content属性

  const title = blogData.title
  const content = blogData.content

  const sql = `
    update blogs set title='${title}', content='${content}' where id='${id}'
  `

  return exec(sql).then(updateData => {
    // console.log('updateData is ', updateData);
    // 更改数，如果更改数 > 0 则更新成功
    if (updateData.affectedRows > 0) {
      return true
    }
    return false
  })
  // return true
}

const deleteBlog = (id, author) => {
  // id 就是要删除博客的id
  const sql = `
    delete from blogs where id='${id}' and author='${author}'
  `
  return exec(sql).then(delData => {
    if (delData.affectedRows > 0) {
      return true
    }
    return false
  })
  // return true
}


module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}