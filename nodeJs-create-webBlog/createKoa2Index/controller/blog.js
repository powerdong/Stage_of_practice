/*
 * @Author: Lambda
 * @Begin: 2019-10-26 13:50:29
 * @Update: 2019-11-03 19:09:14
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
const getList = async (author, keyword) => {
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
  return await exec(sql)
}

const getDetail = async id => {
  const sql = `select * from blogs where id='${id}';`
  const rows = await exec(sql)
  return rows[0]
}

const newBlog = async (blogData = {}) => {
  // blogData 是一个博客对象，包含title，content createtime, author属性
  const title = xss(blogData.title)
  const content = blogData.content
  const author = blogData.author
  const createTime = +new Date()

  const sql = `
    insert into blogs (title, content, createtime, author)
    values ('${title}', '${content}', ${createTime}, '${author}')
  `

  const insertData = await exec(sql)

  return {
    // 本次插入的id
    id: insertData.insertId
  }
}

const updateBlog = async (id, blogData = {}) => {
  // id 就是要更新博客的 id
  // blogData 是一个博客对象，包含title，content属性

  const title = blogData.title
  const content = blogData.content

  const sql = `
    update blogs set title='${title}', content='${content}' where id='${id}'
  `
  // 返回一个sql设置后的回调数据
  const updateData = await exec(sql)

  // 更改数，如果更改数 > 0 则更新成功
  if (updateData.affectedRows > 0) {
    return true
  }
}

const deleteBlog = async (id, author) => {
  // id 就是要删除博客的id
  const sql = `
    delete from blogs where id='${id}' and author='${author}'
  `

  const delData = await exec(sql)

  if (delData.affectedRows > 0) {
    return true
  }
  return false
}


module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}