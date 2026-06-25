// Intel center data + cards
export const INTEL_DATA = {
  0: {
    name:'Klaus Weber',company:'Weber Import GmbH',country:'🇩🇪 德国',score:88,
    basic:[{icon:'🏢',key:'公司规模',val:'50-100人'},{icon:'📅',key:'成立年份',val:'2008年'},{icon:'💰',key:'年营业额',val:'€500万+'},{icon:'🛒',key:'采购频率',val:'季度采购'}],
    locked:[{icon:'📞',key:'直线电话',val:'+49 30 XXXX XXXX'},{icon:'📧',key:'采购负责人邮箱',val:'k.weber@weber-import.de'},{icon:'📊',key:'历史采购额',val:'€120万/年'},{icon:'🎯',key:'决策周期',val:'2-3周'}],
    followup:{title:'⏰ 跟进提醒',text:'Klaus Weber 昨日查看了产品手册 3 次，今日是最佳跟进时机。建议发送包含欧盟认证文件的完整报价单。',btn:'立即生成跟进邮件'}
  },
  1: {
    name:'Rajesh Kumar',company:'Kumar Foods Pte Ltd',country:'🇸🇬 新加坡',score:93,
    basic:[{icon:'🏢',key:'公司规模',val:'20-50人'},{icon:'📅',key:'成立年份',val:'2015年'},{icon:'💰',key:'年营业额',val:'SGD 300万+'},{icon:'🛒',key:'采购频率',val:'月度采购'}],
    locked:[{icon:'📞',key:'直线电话',val:'+65 9XXX XXXX'},{icon:'📧',key:'采购负责人邮箱',val:'rajesh@kumarfoods.sg'},{icon:'📊',key:'历史采购额',val:'SGD 80万/年'},{icon:'🎯',key:'决策周期',val:'1-2周'}],
    followup:{title:'💡 AI 建议',text:'Rajesh 正在等待产品目录，建议在 1 小时内发送，并附上新加坡本地仓储信息以增加竞争优势。',btn:'发送产品目录'}
  }
};


export const INTEL_CENTER_CARDS = [
  {id:0,icon:'🇸🇬',bg:'rgba(31,143,214,.08)',title:'新加坡节庆礼盒需求',sub:'Fairprice Group · 今日更新',badge:'new',badgeText:'新增',rows:[{label:'采购需求量',val:'5,000-8,000 盒'},{label:'目标产品',val:'月饼礼盒、椰子酥'},{label:'预算范围',val:'SGD 15-25/盒'},{label:'交货时间',val:'中秋节前 45 天'}],locked:false},
  {id:1,icon:'🇲🇾',bg:'rgba(31,143,214,.06)',title:'马来西亚月饼批发商',sub:'Jaya Grocer · 今日更新',badge:'new',badgeText:'新增',rows:[{label:'采购需求量',val:'3,000-5,000 盒'},{label:'目标产品',val:'精品月饼礼盒'},{label:'预算范围',val:'MYR 45-80/盒'},{label:'交货时间',val:'端午节前 60 天'}],locked:false},
  {id:2,icon:'🇺🇸',bg:'rgba(23,166,115,.06)',title:'北美华人超市联采',sub:'99 Ranch Market · 昨日更新',badge:'locked',badgeText:'深度情报',rows:[{label:'采购需求量',val:'██████ 盒'},{label:'年度合同金额',val:'$██████'},{label:'决策负责人',val:'██████'},{label:'联系方式',val:'██████'}],locked:true},
  {id:3,icon:'🇦🇺',bg:'rgba(30,95,200,.06)',title:'澳洲华人社区采购',sub:'Asian Grocery Pty · 2天前',badge:'locked',badgeText:'深度情报',rows:[{label:'采购需求量',val:'██████ 盒'},{label:'年度合同金额',val:'$██████'},{label:'决策负责人',val:'██████'},{label:'联系方式',val:'██████'}],locked:true},
];

