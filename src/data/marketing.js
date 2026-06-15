// Marketing queue items + email A/B variants
export const MKT_ITEMS = [
  {id:0,flag:'🇸🇬',name:'Klaus Weber',company:'Weber Import GmbH',product:'月饼礼盒 · 欧洲市场',score:88,status:'pending'},
  {id:1,flag:'🇲🇾',name:'Rajesh Kumar',company:'Kumar Foods Pte',product:'椰子酥礼盒 · 新加坡',score:93,status:'pending'},
  {id:2,flag:'🇺🇸',name:'Sarah Chen',company:'Chen Family Imports',product:'节庆礼盒 · 北美华人',score:89,status:'pending'},
  {id:3,flag:'🇦🇺',name:'James Wong',company:'Asian Grocery Pty',product:'精品月饼 · 澳洲',score:84,status:'pending'},
  {id:4,flag:'🇹🇭',name:'Somchai Patel',company:'Central Food Hall',product:'椰子酥 · 泰国',score:87,status:'pending'},
  {id:5,flag:'🇨🇦',name:'Emily Zhang',company:'T&T Supermarket',product:'节庆礼盒 · 加拿大',score:91,status:'approved'},
  {id:6,flag:'🇮🇩',name:'Budi Santoso',company:'Transmart Carrefour',product:'中式糕点 · 印尼',score:82,status:'pending'},
];


export const EMAIL_VARIANTS = {
  0: [
    {hook:'文化切入',subject:'正宗漳浦风味，让德国华人重温家乡节庆',conf:92,body:`尊敬的 Klaus Weber 先生，

您好！我是来自万仟糕饼的 Liu Wei。

我注意到贵公司 Weber Import GmbH 在德国华人食品市场深耕多年，对节庆礼盒有稳定的采购需求。

万仟糕饼创立于 1991 年，扎根漳浦 35 年，是正宗漳浦风味糕饼的代表品牌。我们的高端节庆礼盒系列——尤其是椰子酥礼盒和精品月饼——已在东南亚华人市场获得广泛认可。

针对欧洲市场，我们提供：
• 符合 EC 852/2004 欧盟食品安全标准
• 德语/英语双语包装定制
• 最小起订量 500 盒，支持混合订购

期待与您探讨合作可能性。

Liu Wei | 万仟糕饼 国际业务部`},
    {hook:'数据驱动',subject:'德国华人节庆食品市场：$2.3M 采购机会分析',conf:87,body:`Klaus Weber 先生，

您好！

根据我们的市场数据，德国华人社区（约 21 万人）每年在节庆食品上的消费约达 $2.3M，其中正宗中式糕点占比持续上升。

万仟糕饼作为漳浦地区最大的节庆糕饼生产商（年产能 15,000 吨），可为贵公司提供稳定、高品质的供应保障。

我们的合作客户包括新加坡 Fairprice、马来西亚 Jaya Grocer 等知名连锁，均对产品质量给予高度评价。

是否方便本周安排 15 分钟视频通话？

Liu Wei`},
    {hook:'节庆时机',subject:'中秋节前 90 天：把握欧洲华人礼盒采购窗口',conf:85,body:`Klaus Weber 先生，

距离中秋节还有 90 天，这是欧洲华人节庆食品采购的黄金窗口期。

去年同期，我们为欧洲客户完成了超过 50,000 盒节庆礼盒的出口，今年产能已提前规划，但优质档期有限。

万仟精品月饼礼盒（4 款口味，含传统莲蓉、低糖系列）和椰子酥礼盒（漳浦特色，独家配方）是欧洲华人社区最受欢迎的两款产品。

如有意向，建议本周确认意向数量，以便我们为您预留产能。

期待您的回复！

Liu Wei | 万仟糕饼`},
  ]
};

