// WhatsApp contacts / chats / quick-reply chips
export const WA_CONTACTS = [
  {id:0,name:'Klaus Weber',company:'Weber Import GmbH',country:'🇩🇪',av:'K',color:'#1e40af',last:'好的，我们明天确认报价',time:'刚刚',unread:2,status:'在线'},
  {id:1,name:'Rajesh Kumar',company:'Kumar Foods Pte',country:'🇸🇬',av:'R',color:'#065f46',last:'请发送产品目录',time:'10分钟',unread:1,status:'在线'},
  {id:2,name:'Ahmed Al-Rashid',company:'Al-Rashid Trading',country:'🇦🇪',av:'A',color:'#7c2d12',last:'已收到，正在查看',time:'1小时',unread:0,status:'离线'},
  {id:3,name:'Carlos Silva',company:'Silva Distribuidora',country:'🇧🇷',av:'C',color:'#1e3a5f',last:'我们对月饼很感兴趣',time:'昨天',unread:0,status:'离线'},
  {id:4,name:'Yuki Tanaka',company:'Tanaka Foods Co.',country:'🇯🇵',av:'Y',color:'#4a1d96',last:'价格可以商量吗？',time:'昨天',unread:0,status:'离线'},
  {id:5,name:'Sarah Chen',company:'Chen Family Imports',country:'🇺🇸',av:'S',color:'#134e4a',last:'非常感谢，期待合作',time:'2天前',unread:0,status:'离线'},
];


export const WA_CHATS = {
  0: [
    {type:'in',text:'您好！我是 Klaus Weber，来自德国 Weber Import GmbH。我们专注进口亚洲食品，对贵公司的节庆礼盒系列非常感兴趣。',time:'09:15'},
    {type:'out',text:'您好 Klaus！感谢您的关注。我们的节庆礼盒系列包含高端椰子酥、精品月饼等，均符合欧盟食品安全标准。请问您主要关注哪类产品？',time:'09:22'},
    {type:'in',text:'主要是月饼礼盒和椰子酥。我们在德国有稳定的华人社区渠道，每年中秋节前需求量很大。请问最小起订量是多少？',time:'09:35'},
    {type:'out',text:'月饼礼盒 MOQ 为 500 盒，椰子酥 MOQ 为 300 盒。我们提供定制包装服务，可以添加德语说明。需要我发送详细报价单吗？',time:'09:40'},
    {type:'in',text:'好的，请发送报价单。另外，你们有欧盟食品安全认证吗？这对我们进口很重要。',time:'09:52'},
    {type:'follow',text:'⏰ 跟进提醒：Klaus Weber 正在等待报价单，建议在 2 小时内回复以保持谈判热度'},
  ],
  1: [
    {type:'in',text:'Hello! I am Rajesh from Kumar Foods Singapore. We are interested in your festival gift boxes for the Chinese New Year season.',time:'10:05'},
    {type:'out',text:'Hi Rajesh! Great to connect. Our CNY gift boxes are very popular in Singapore. We have premium coconut pastry and mooncake sets. What quantity are you looking for?',time:'10:12'},
    {type:'in',text:'We need around 2000 boxes for CNY. Can you send me your product catalog with pricing?',time:'10:18'},
  ],
  2: [
    {type:'in',text:'السلام عليكم، أنا أحمد من شركة الراشد للتجارة. نحن مهتمون باستيراد الحلويات الصينية.',time:'11:30'},
    {type:'out',text:'وعليكم السلام أحمد! يسعدنا التعاون معكم. لدينا مجموعة متنوعة من الحلويات الصينية التقليدية. هل يمكنك إخبارنا بالمزيد عن متطلباتكم؟',time:'11:45'},
    {type:'in',text:'نريد تفاصيل عن صناديق الهدايا الخاصة بالأعياد الصينية. شكراً.',time:'12:00'},
  ],
};


export const WA_CHIPS = {
  0: ['✅ 我们持有 EC 852/2004 欧盟食品安全认证，可提供完整证书文件','📦 正在为您准备详细报价单，预计 2 小时内发送，请稍候','🎁 我们提供德语定制包装，可在包装上印制您的品牌 Logo'],
  1: ['📋 产品目录已准备好，包含完整规格和价格，马上发送给您','🇸🇬 我们在新加坡有合作仓储，可实现 3-5 天快速交货','💰 2000 盒以上享受 8 折优惠，CNY 旺季建议提前 3 个月下单'],
  2: ['📄 我们可以提供阿拉伯语产品说明书和清真认证文件','🌙 我们的节庆礼盒非常适合斋月和开斋节市场','💼 欢迎安排视频会议，详细介绍我们的产品线和合作条件'],
};

