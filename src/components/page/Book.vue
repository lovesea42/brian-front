<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>搜索中心</el-breadcrumb-item>
                <el-breadcrumb-item>技术书推荐</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-select v-model="select_cate" placeholder="数据来源" class="handle-select mr10">
                <el-option key="1" label="豆瓣评论" value="douban"></el-option>
            </el-select>
            <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <el-table :data="data" stripe border style="width: 100%" ref="multipleTable">
            <el-table-column prop="name" label="书名" sortable width="320">
            </el-table-column>
          <el-table-column prop="img" label="图片" width="150" >
              <template scope="scope">
                      <img :src="scope.row.img" width="80%" height="150" />
               </template>
          </el-table-column>
            <el-table-column prop="author" label="作者" width="200">
            </el-table-column>
            <el-table-column prop="publisher" label="出版社" width="200" >
            </el-table-column>
          <el-table-column  sortable    label="评分" width="180">
            <template slot-scope="scope">
              <el-rate
                v-model=(scope.row.star/2.0).toFixed(1)
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
                {{ scope.row.star/2.0 }}
              </el-rate>
            </template>>

          </el-table-column>
          <el-table-column prop="comment" sortable label="评论数" width="80">
          </el-table-column>
          <el-table-column prop="price" sortable label="价格" width="80">
          </el-table-column>
          <el-table-column prop="tags" label="标签" width="200" >
          </el-table-column>
           <el-table-column label="操作" width="100">
               <template scope="scope">
                   <el-button size="small"
                           @click="openUrl(scope.$index, scope.row)">打开</el-button>
               </template>
           </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                    @current-change ="handleCurrentChange"
                    layout="total, sizes, prev, pager, next, jumper"
                    :current-page="currentPage"
                    :page-sizes="[5, 10, 20, 30]"
                    :page-size="pagesize"
                    :total="totalCount">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                url: './static/vuetable.json',
                tableData: [],
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                 //搜索条件
                 criteria: '',

                //下拉菜单选项
                select: '',

                //默认每页数据量
                pagesize: 10,

                //默认高亮行数据id
                highlightId: -1,

                //当前页码
                currentPage: 1,

                //查询的页码
                start: 1,

                //默认数据总数
                totalCount: 0
            }
        },
        created(){
            //this.getData();
        },
        computed: {
            data(){
                const self = this;
                return self.tableData
//                return self.tableData.filter(function(d){
//                    let is_del = false;
//                    for (let i = 0; i < self.del_list.length; i++) {
//                        if(d.name === self.del_list[i].name){
//                            is_del = true;
//                            break;
//                        }
//                    }
//                    if(!is_del){
//                        if(d.address.indexOf(self.select_cate) > -1 &&
//                            (d.name.indexOf(self.select_word) > -1 ||
//                            d.address.indexOf(self.select_word) > -1)
//                        ){
//                            return d;
//                        }
//                    }
//                })
            }
        },
        methods: {
            handleCurrentChange(val){
                this.currentPage = val;
                this.getData(this.criteria,this.currentPage,this.pagesize);
            },
            getData(criteria,currentPage,pagesize){
                let self = this;

              let url_data = process.env.API_ROOT + '/doubanbook?' + 'page=' + (this.currentPage-1) + "&&size=" + this.pagesize;
              let url_num = process.env.API_ROOT + '/doubanbooknum'

              if(this.select_word.length > 0){
                url_data += ("&&keyword="+this.select_word)
                url_num += ("?keyword="+this.select_word)
              }

              self.$axios.get(url_num).then(res=>{
                console.log('totalnum = ' + res.data)
                this.totalCount = res.data
              })

              self.$axios.get(url_data).then(res=>{
                console.log(res.data)
                this.tableData = res.data
              })
            },
            search(){
                this.is_search = true;
                this.getData()
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.$message('编辑第'+(index+1)+'行');
            },
            openUrl(index, row) {
               let url = this.tableData[index].url
               window.open(url);
            },
            handleDelete(index, row) {
                this.$message.error('删除第'+(index+1)+'行');
            },
            delAll(){
                const self = this,
                    length = self.multipleSelection.length;
                let str = '';
                self.del_list = self.del_list.concat(self.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += self.multipleSelection[i].name + ' ';
                }
                self.$message.error('删除了'+str);
                self.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    }
</script>

<style scoped>
.handle-box{
    margin-bottom: 20px;
}
.handle-select{
    width: 120px;
}
.handle-input{
    width: 300px;
    display: inline-block;
}
</style>
