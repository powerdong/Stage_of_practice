### 
# @Author: Lambda
 # @Begin: 2019-10-30 14:47:16
 # @Update: 2019-10-30 14:49:04
 # @Update log: 更新日志
 ###
# !/bin/sh
cd E:\nodeJs-create-webBlog\createIndex\logs
cp access.log $(date + %Y-%m-%d).access.log
echo "" > access.log 