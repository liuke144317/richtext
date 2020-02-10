/*可共用方法*/
const common_function = {
  /***
   * params:full
   */
  getCurrentTime(type) {
    let str;
    const now = new Date();
    const year = now.getFullYear(), //得到年份
    month = now.getMonth()+1,//得到月份
    date = now.getDate(),//得到日期
    hour = now.getHours(),//得到小时
    minu = now.getMinutes(),//得到分钟
    sec = now.getSeconds();//得到秒
    str = year+'-'+month+'-'+date
    if(type === 'full'){
      str +=" "+hour+':'+minu+':'+sec
    }
    return str;
  }
}
export default  common_function;
