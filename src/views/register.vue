<template>
  <div class="register">
    <div class="club-cont">
      <div class="club-top">
        <div class="club-txt">
          <h4>欢迎来到曼粉俱乐部</h4>
          <!-- <p>为了更好的了解您的需要，并推送相关信息给你</p> -->
        </div>
        <div v-if="showZX" @click="clearInfo" class="cancel">
          <img src="../assets/img/member/logout.png" alt="" />
          <p>注销</p>
        </div>
      </div>
      <!-- <div class="re-form">
        <input type="text" placeholder="您的姓名" />
        <input type="text" placeholder="您的公司" />
      </div> -->
      <div class="club-title">您是我们的?</div>
      <ul class="things">
        <li
          :class="[curr == index ? 'active' : '']"
          @click="getRole(index)"
          v-for="(item, index) in things"
          :key="index"
          v-html="item.text"
        ></li>
      </ul>
      <div class="club-title">您关注我们的品牌有哪些?</div>
      <div class="logos">
        <img
          @click="setOpacity(index)"
          v-for="(item, index) in logos"
          :class="[item.active ? 'active' : '']"
          :key="index"
          :src="item.logo"
          alt=""
        />
      </div>
      <div class="club-title">您会把我们的产品应用在哪些场景?</div>
      <ul class="things types">
        <li
          :class="[item.active ? 'active' : '']"
          @click="getPlace(index)"
          v-for="(item, index) in types"
          :key="index"
        >
          {{ item.title }}
        </li>
      </ul>
      <div class="club-title">您是否希望定期收到我们的产品推荐?</div>
      <div class="re-form">
        <input v-model="email" type="text" placeholder="您的邮箱" />
      </div>
      <div class="club-top">
        <div class="club-txt">
          <p>为了更好的了解您的需要，并推送相关信息给你</p>
        </div>
      </div>
      <div class="re-form">
        <input type="text" v-model="namer" placeholder="您的姓名" />
        <input type="text" v-model="company" placeholder="您的公司" />
      </div>
      <div class="agree">
        <van-checkbox
          shape="square"
          icon-size="14px"
          v-model="checked"
        ></van-checkbox>
        <span @click="show = true"
          >我已阅读并同意隐私条款《注册会员服务条款》</span
        >
      </div>
      <div class="btn-zone">
        <van-button
          @click="submit"
          block
          color="#0064a0"
          type="primary"
          size="small"
          :disabled="!checked"
          >确定</van-button
        >
      </div>
    </div>
    <van-popup v-model:show="show" :style="{ width: '100%' }">
      <div class="cont">
        HARMAN International 隐私声明<br />
        上次更新时间：2022 年 12 月 1 日​<br />
        HARMAN
        International（“HARMAN”或“本公司”）重视您的隐私，并致力于保护您的个人信息。
        本隐私声明解释了我们如何处理、存储、共享和保护您在使用我们的产品和解决方案、我们的网站（“网站”）或以其他方式与公司互动时提供的个人信息。
        就本隐私声明而言，“个人信息”是指与您作为个人身份可识别个人相关的信息，例如您的姓名、电子邮件地址和手机号码。
        本隐私声明的备用格式可供残障人士使用。请联系 privacy@harman.com 寻求帮助<br />
        本隐私声明涉及以下主题：<br />
        我们收集的个人信息<br />
        o我们从您处收集的个人信息<br />
        o我们通过本网站上的技术收集的个人信息<br />
        o我们从第三方收到的个人信息<br />
        我们使用和收集您的个人信息的目的<br />
        我们何时分享您的个人信息<br />
        我们如何保护您的个人信息<br />
        地区特定的信息<br />
        o美国以外的所有地点<br />
        o欧洲经济区、英国和瑞士<br />
        o巴西<br />
        o中国<br />
        o加利福尼亚州<br />
        本隐私声明的变更​​<br />

        我们收集的个人信息<br />
        我们从您处收集的个人信息<br />
        当您使用本网站、使用我们的产品或汽车解决方案、注册您的 HARMAN
        产品，或在贸易展览或会议上直接与本公司互动时，或者当您联系本公司时（在此隐私声明中统称为“服务”），HARMAN
        可能会从您处收集个人信息。
        我们可能收集的个人信息取决于您使用的服务。我们收集的个人信息可能包括以下类别：
        联系信息和识别码: 包括您的姓名；地址；电子邮件地址；电话号码；唯一在线识别码、互联网协议地址（“IP
        地址”）；账户名称；以及出生日期。 登录信息: 包括您用于访问 HARMAN
        网站功能和其他服务的用户名和密码。<br />

        付款信息: 包括您的付款方式；银行账号、借记卡号、信用卡号、CVV/CID、失效日期；账单地址。<br />

        位置信息: 包括在您使用某些服务时收集的地理位置信息。<br />

        产品和服务使用信息: 包括产品名称、序列号、购买地、产品使用信息、颜色、版本；产品评论和保修信息。<br />

        购买历史信息: 包括所购买产品的名称、购买地点和购买产品的价格。<br />

        互联网或其他电子网络活动信息: 包括在 HARMAN
        网站上访问的页面和点击的链接；IP
        地址；位置信息；语言偏好和与广告的互动。<br />

        生物特征信息: 包括语音录音，从中可以提取识别码模板，例如可以提取的声纹，包含识别信息的睡眠和健康数据，以及指纹数据.<br />

        感官信息:包括可与特定消费者或家庭关联或相关的音频、视觉、热信息或类似信息。<br />

        您提供的其他信息: 包括与您使用我们服务相关的个人信息，例如您使用我们服务的日期/时间、您使用我们服务的时间长度，或您使用我们服务的原因。<br />

        我们通过本网站上的技术收集的个人信息
        我们通过技术收集信息，以增强我们为您服务的能力。当您访问和使用本网站时，HARMAN
        和我们的第三方服务提供商（在某些情况下）会收集有关您如何与本网站互动的信息。
        请参阅以下链接​以获取更多信息： Cookie 政策​ <br />
        我们从第三方收到的个人信息 根据您使用的服务，HARMAN
        还可能从第三方收集有关您的信息，包括： <br />
        服务提供商: 包括我们的网站支付处理商、与我们合作、为我们的产品提供服务的公司，以及我们的会议和贸易展览活动的主办方。<br />
        供应商: 包括销售我们产品的公司。 原始设备制造商
        (OEM): 包括在其车辆中使用我们产品的公司。<br />
        我们收集和使用您的个人信息的目的<br />
        HARMAN 可能会将您的个人信息用于以下目的：​<br />
        提供我们的服务<br />
        改善我们的服务<br />
        与您沟通<br />
        验证您的身份<br />
        让用户报名参加 HARMAN 的促销和活动<br />
        回应技术支持问题和疑问<br />
        出于营销、广告和销售目的联系用户<br />
        回答问题和反馈<br />
        进行市场调查和分析<br />
        • 为技术开发进行内部研究<br />
        持续评估和改善在线用户体验<br />
        网络与信息安全<br />
        预防诈骗<br />
        允许访问我们的设施<br />
        举报涉嫌犯罪行为<br />
        遵守法律或保护 HARMAN、我们的用户或他人的权利、财产或安全<br />
        我们何时分享您的个人信息​<br />
        我们不会将您的个人信息出售或出租给第三方。
        以下是我们分享您的个人信息的一些方式：<br />
        ​​第三方服务提供商: 我们将与和 HARMAN
        签订合同的第三方服务提供商共享您的个人信息，以帮助我们为您提供服务。
        以下举例说明了我们与之共享您的个人信息的第三方服务提供商类型，以及我们这样做的目的：<br />
        o数据分析: 我们聘请第三方服务提供商来帮助我们对您与本网站的互动进行数据分析。例如，Google
        Analytics
        可能会跟踪用户在网站上访问的页面及其在页面上停留的时间，以确定用户如何使用网站。<br />
        o法律咨询: 在获取法律建议的过程中，我们可能会向律师披露您的个人信息。<br />
        o第三方处理方: 当您从我们的网站购买产品或联系我们在某些国家/地区的当地服务提供商时，我们会使用第三方订单和支付处理方。
        我们还使用第三方服务提供商来组织 HARMAN 会议和贸易展览。<br />
        o广告平台: 我们可能会向广告联盟披露您访问本网站的事实，以便他们可以在其他网站和平台上向您展示
        HARMAN 广告。
        这些服务可以帮助我们根据您对本网站的使用情况来定制我们认为您可能感兴趣的广告，并以其他方式收集和使用有关您对本网站使用的数据。<br />
        我们通过书面协议，要求这些第三方服务提供商仿照我们的保护措施，以保护您的个人信息。<br />
        ​要求披露: 我们可能需要在法庭程序中共享个人信息，以响应法庭命令、传票、民事披露请求、其他法律程序或法律要求。<br />
        法律合规和保护: 当我们认为有必要披露您的个人信息以遵守法律或保护
        HARMAN、我们的用户或他人的权利、财产或安全时，我们可能会披露您的个人信息。这包括与其他公司和组织交换个人信息，以防范欺诈和降低信用风险。<br />
        公司交易: 我们保留披露和转让您的个人信息的权利：<br />
        o与公司兼并、合并、破产、出售我们几乎所有的会员权益和/或资产或其他公司变更有关，包括向任何潜在购买者。<br />
        o给网站或后续数据库的后续所有者、共同所有者或运营商。<br />
        我们如何保护您的个人信息<br />
        您的个人信息的安全性和机密性对我们很重要。
        我们采取了技术、行政和物理安全措施来保护您的个人信息免遭未经授权的访问或披露以及不当使用。<br />
        例如，我们使用传输安全层 (TSL)
        加密来保护我们网站上的数据收集表格。此外，我们限制对您的个人信息的访问。只有需要个人信息来执行特定工作的员工（例如，客户服务代表）才有权访问个人信息。有权访问个人信息的员工会及时了解我们的安全和隐私惯例。<br />
        防止未经授权访问您的密码和计算机，这对您来说非常重要。完成对本网站的访问后，请务必关闭浏览器。请注意，尽管我们做出了合理的努力，但没有任何安全措施是完美的或无懈可击的，因此我们无法保证您的个人信息的安全。​<br />
        地区特定的信息<br />
        美国以外的所有地点<br />
        ​HARMAN 通过本网站收集的个人信息被下载到由 HARMAN 在美国维护的服务器上。
        HARMAN 在美国的地址为 400 Atlantic Street, 15th Floor, Stamford, CT
        06901。<br />
        由于 HARMAN 是一家全球性公司，其分支机构遍布世界各地，因此，HARMAN
        将本公司从您处收集的个人信息存储在此地址之外——例如，当您联系我们或在贸易展览会或会议上直接与
        HARMAN 互动时——具体取决于您的居住国家/地区。
        如需更多信息，请联系 privacy@harman.com.​<br />
        跨境数据传输: <br />
        为了提供我们的服务，我们在世界各地（包括美国）的实体可能需要访问您的个人信息。
        在将您的个人信息传输到我们遍布世界各地的任何实体之前，HARMAN
        将确保落实所有必要的传输机制，以确保为您的个人信息传输提供足够的保护。<br />
        处理的法律依据:<br />
        HARMAN 在经过您的同意和法律要求的情况下处理您的个人信息。
        在适用的情况下，HARMAN
        会根据与您签订的任何合同的需要处理您的个人信息；例如，在处理您的订单和付款，或为您提供我们的服务时，并在与您签订合同之前应您的要求采取措施。
        HARMAN 还根据其如下合法利益处理个人信息：<br />
        ​<br />
        o市场营销和广告: 除非您按如下所述选择退出，否则我们会根据需要使用关于您已订购或您以其他方式表现出兴趣的产品和服务的个人信息，以根据适用的法律，向您提供我们认为您可能会感兴趣的产品和服务的信息。<br />
        o网络与信息安全、防欺诈、举报涉嫌犯罪行为: 如果发生欺诈、安全事件或涉嫌犯罪行为，我们将根据需要检查看似与事件相关的个人信息，以确定发生的情况、做出补救、向当局报告并防止再次发生。<br />
        自动决策:<br />
        HARMAN 有时会使用通过网站提交的个人信息进行自动决策。例如，HARMAN
        可能会向您展示广告并向您发送电子邮件，其中包含根据您过去从我们这里订购的产品自动选择的内容。但是，HARMAN
        不会将通过网站提交或通过我们的其他服务获得的个人信息用于自动决策，包括分析，这会产生法律效力，或类似地显著影响数据主体。​<br />
        保留:<br />
        HARMAN 将在完成 HARMAN
        收集您的个人信息的目的所需的时间段内保留您的个人信息，并在此后适用法律允许或要求的时间内保留您的个人信息。
        有关保留您的个人信息的更多详情，请联系 privacy@harman.com​​<br />
        退订电子邮件：<br />
        此外，您可以按照我们发送的电子邮件中包含的说明，取消或修改您选择从
        HARMAN 接收的电子邮件通信。 或者，您可以通过 unsubscribe@harman.com 向
        HARMAN 发送您的请求，在标题中注明“取消订阅”以及您希望拒接 HARMAN
        电子邮件的电子邮件地址。在合理期限内，我们将确保此类电子邮件地址取消订阅。<br />
        ​<br />
        欧洲经济区、英国和瑞士<br />
        本节中的信息以及上面标题为“美国以外的所有地点”部分中的信息适用于欧洲经济区、英国和瑞士（简称“EEA”）的用户。<br />
        ​<br />
        跨境数据传输： 欧盟委员会尚未发布关于美国确保对个人信息提供足够保护水平的决定。因此，HARMAN
        已实施欧盟委员会于 2021 年 6 月 4 日发布的新的标准合同条款，来管理来自
        EEA 的个人信息的跨境传输。 对于从英国传输个人信息，Harman
        使用英国的国际数据传输协议。<br />
        个人权利：EEA 个人有权访问 HARMAN 收集的个人信息，并根据适用法律要求
        HARMAN 更新、更正或删除其个人信息。EEA 个人也有权拒绝或限制 HARMAN
        对其个人信息的处理。此外，EEA 个人享有与其个人信息相关的数据可携权。<br />
        EEA 个人可通过联系 数据查询和隐私请求网站 行使这些权利。 HARMAN
        将根据适用的数据保护法回应此类请求。 如果 EEA
        个人认为对其个人信息的处理违反了适用的数据保护法，他们有权向其居住国家/地区、工作地或涉嫌违规发生地的相关数据保护机构提出投诉。
        EEA 个人还有权通过 Harman 的 数据查询和隐私请求网站, 拒绝 HARMAN
        出于直接营销或合法利益目的处理其个人信息。<br />
        如果 HARMAN 需要个人的同意作为处理其个人信息的法律依据，EEA
        个人可以随时通过 Harman
        的 数据查询和隐私请求网站​撤回对处理其个人信息的同意。
        任何撤回将仅在未来适用，并且只要适用法律允许或要求，HARMAN 将继续保留
        EEA 个人在撤回同意之前提供的个人信息。<br />
        数据保护官：HARMAN
        在德国的数据保护官是健康与安全高级经理，联系方式 privacy@harman.com<br />
        ​<br />
        巴西 <br />
        本部分的信息以及上面标题为“美国以外的所有地点”部分中的信息适用于巴西居民。
        在本网站之外从巴西居民处收集的个人信息由 HARMAN 存储在巴西，具体地址为
        Rodovia Governador Leonel de Moura Brizola, nº 3401, Nova Santa
        Rita-RS/Brasil 92480-000。<br />
        个人权利：<br />
        对于个人信息的处理，巴西居民拥有以下权利：<br />
        ​<br />
        o要求确认个人信息处理的权利；<br />
        o要求访问个人信息的权利；<br />
        o要求更正和/或更新个人信息的权利；<br />
        o要求匿名、阻止或消除对个人信息不必要、过度或违法处理的权利；<br />
        o要求将个人信息从一个服务提供商转移到另一个服务提供商的权利；<br />
        o要求删除之前在您许可下处理的您的个人信息的权利；<br />
        o要求识别公司向其披露个人信息或公司使用包含个人信息的共享数据库的公共和私人实体的权利；以及<br />
        o拒绝处理个人信息的权利。<br />
        巴西居民可以通过 Harman 的 数据查询和隐私请求网站.行使他们的隐私权。
        HARMAN 将根据适用的数据保护法回应此类请求。<br />
        在 HARMAN
        需要用户同意作为处理个人信息的法律依据的情况下，巴西居民可随时使用上述联系信息撤回对处理其个人信息的同意。
        任何撤回将仅在未来适用，并且只要适用法律允许或要求，HARMAN
        将继续保留巴西居民在撤回同意之前提供的个人信息。<br />
        ​<br />
        数据保护官 / "负责人" <br />
        HARMAN 在巴西的数据保护官或监督个人信息处理的“负责人”是公司的 IT
        协调员，联系方式： BrazilPrivacy@harman.com<br />
        中华人民共和国 (PRC)<br />
        本部分中的信息以及上面标题为“美国以外的所有地点”部分中的信息适用于中华人民共和国居民。<br />
        跨境数据传输：使用本网站，即表示您同意跨境传输您的个人信息，除非您通过下述信息联系我们撤回您的同意。在将您的个人信息从中华人民共和国传输到中华人民共和国境外的其他地点之前，HARMAN
        将确保落实所有必要的传输机制，以确保在将您的个人信息传输至中华人民共和国境外的这些实体的过程中提供充分的保障。<br />
        个人权利： 中华人民共和国居民有权：(a) 了解您的个人信息的处理方式； (b)
        请求访问您的个人信息； (c) 要求更正您的个人信息； (d)
        补充不完整的个人信息； (e) 要求删除您的个人信息； (f)
        限制或拒绝处理您的个人信息，除非适用法律要求进行此类处理； (g)
        要求将您的个人信息传输给第三方； (h) 撤回您对处理您的个人信息的同意；
        (i) 要求解释在中华人民共和国境内的个人信息处理规则。<br />
        中华人民共和国居民可以通过 Harman
        的 数据查询和隐私请求网站行使这些权利。 HARMAN
        将根据适用的数据保护法回应此类请求。
        如果中华人民共和国居民认为对其个人信息的处理违反了适用的数据保护法，他们有权向数据保护机构提出投诉。<br />
        中华人民共和国居民可以随时通过 Harman
        的数据查询和隐私请求网站撤回对处理其个人信息的同意，如果 HARMAN
        需要他们的同意作为处理其个人信息的法律依据。
        任何撤回将仅在未来适用，并且只要适用法律允许或要求，HARMAN
        将继续保留中华人民共和国居民在撤回同意之前提供的个人信息。<br />
        ​加利福尼亚州 <br />
        本隐私声明部分仅适用于身为美国加利福尼亚州居民的消费者（“加利福尼亚州消费者”），并且适用于
        HARMAN 出于商业目的收集或披露的加利福尼亚州消费者的所有个人信息。
        我们收集的信息和我们收集信息的商业目的：: <br />
        在过去 12 个月中，HARMAN 使用了我们从以下来源收集的
        ​ 此处 列出的个人信息类别：<br />
        直接来自加州消费者<br />
        来自上述技术提供商<br />
        来自上述第三方服务提供商<br />
        ​​​ ​<br />
        HARMAN 出于 此处​.列出的业务和商业目的收集加州消费者的个人信息<br />
        披露我们收集的个人信息：<br />
        在过去 12 个月中，HARMAN
        出于业务或商业目的向以下类别的第三方披露了以下类别的加利福尼亚消费者个人信息：<br />​​
        个人信息的类别 第三方的类别<br />
        联系信息和识别码
        服务提供商，包括数据分析服务提供商、网站提供商和电子商务供应商<br />
        政府机构、执法部门和法律要求的其他各方，包括诉讼中<br />
        互联网或其他电子网络活动信息
        服务提供商，包括数据分析服务提供商和网站提供商<br />
        位置信息 政府机构、执法部门和法律要求的其他各方，包括诉讼中<br />
        商业信息、支付（财务）信息 服务提供商，包括电子商务供应商<br />
        感官信息 服务提供商，包括语音转文本供应商<br />
        产品和服务使用信息 服务提供商，包括数据分析服务提供商和网站提供商<br />
        政府机构、执法部门和法律要求的其他各方，包括诉讼中<br />
        <br />

        ​禁止出售个人信息：<br />
        HARMAN 没有也不会出售个人信息。​<br />
        您的加利福尼亚州隐私权：<br />
        知情权<br />
        加州消费者有权提交可验证的请求，以了解：<br />
        HARMAN 收集的有关其个人信息的类别和特定片段；<br />
        HARMAN 收集个人信息的来源类别；<br />
        HARMAN
        出于商业目的向第三方（服务提供商除外）出售或披露的个人信息类别和该信息的接收者类别；以及<br />
        HARMAN 收集、披露或出售个人信息的业务或商业目的。​<br />
        删除权<br />
        加州消费者有权提交可验证的请求，要求删除 HARMAN
        从消费者处收集的个人信息。<br />
        请求知情或删除<br />
        如果我们能够验证提交请求的个人的身份，HARMAN
        将根据适用法律回应请求。加州消费者或其授权代理人可以通过以下方式行使权利：<br />
        通过我们的 数据查询和隐私请求网站填写在线隐私请求<br />
        发送电子邮件至 privacy@harman.com<br />
        拨打 +1 (877) 871-6755 联系我们<br />
        我们将如何验证您的请求<br />
        当您提交了解请求或删除请求时，我们会采取以下流程来验证您的身份：<br />
        第 1 步: 验证电子邮件：HARMAN
        将向您提供的用于注册我们服务的电子邮件地址发送邮件。请通读此电子邮件并完成验证标准，完成后将回复电子邮件发送回
        HARMAN。要求的标准如下所述:<br />
        o​通读您从 HARMAN
        收到的电子邮件。在电子邮件中，我们将要求您回复至少两条信息以验证您的身份，具体取决于您的请求的性质，以及您请求的信息的敏感性。<br />
        o回复电子邮件并向我们提供至少两条（有时是三条）信息，HARMAN
        会将您提供的信息与公司已经保存的关于您的信息相匹配。HARMAN
        只会将您提供的信息用于验证您的身份。<br />
        o确认我们对您希望我们采取的行动的概述（例如，“删除我的个人信息”）。<br />
        o将回复邮件发送回原始发件人，并附上上述答案，以证明您拥有该电子邮件地址。
        第 2 步: 收到上述信息并确认您的身份后，我们会采取行动来满足您的要求。
        在您提交知情请求或删除请求而 HARMAN
        没有您的电子邮件地址的极少数情况下，我们将通过电话执行上述步骤。
        如果我们无法以足够确定的方式验证您的身份以响应您的请求，我们将及时通知您，并解释我们无法验证您的身份的原因。<br />
        HARMAN 的非歧视政策<br />
        加州消费者根据《加州消费者隐私法》行使其隐私权，有权不因此而受到 HARMAN
        的歧视性对待，并且 HARMAN
        不会因此而进行歧视。但是，如果差异与消费者个人信息向加利福尼亚消费者提供的价值合理相关，HARMAN
        可能会向加利福尼亚消费者收取不同的价格或费率，或提供不同水平或质量的商品或服务。如果
        HARMAN 这样做，它将向消费者提供任何法律要求的通知。<br />
        使用本网站的加州居民可能会要求我们提供某些信息，以供我们出于直接营销目的而向第三方披露您的个人信息。您可以通过发送电子邮件至 privacy@harman.com.提出此类请求。<br />
        疑问<br />
        加州消费者如对本隐私声明中的任何内容有任何疑问，则可通过 privacy@harman.com 或
        1 (877) 871-6755 联系 HARMAN。<br />
        ​本隐私声明的变更<br />
        如果我们更改本隐私声明，我们将在此页面上发布这些更改，并更新上面的隐私声明更新日期。如果我们对本隐私声明进行的实质性变更影响我们使用或披露您的个人信息的方式，则我们将在进行变更之前提供此类更改的醒目通知以及更改的生效日期。<br />
      </div>
    </van-popup>
    <foot></foot>
  </div>
</template>

<script>
import indexHeader from "@/components/header.vue";
import indexTitle from "@/components/title.vue";
import item from "@/components/item.vue";
import foot from "@/components/foot.vue";
import { showConfirmDialog } from "vant";
import { showToast,showSuccessToast,showFailToast } from 'vant';
import { getData } from "../api";
import { getUrlString } from "@/utils/tools.js";
export default {
  components: {
    indexHeader,
    indexTitle,
    item,
    foot,
  },
  data() {
    return {
      env: window.env,
      showZX:false,
      show: false,
      name: "",
      password: "",
      curr: -1,
      active: -1,
      logoAct: -1,
      checked: false,
      email:'',
      namer:'',
      company:'',
      things: [
        {
          text:'集成商',
          title:'集成商'
        },
        {
          text:'工程商',
          title:'工程商'
        },
        {
          text:'批发<br/>零售商',
          title:'批发零售商'
        },
        {
          text:'经销商',
          title:'经销商'
        },
        {
          text:'终端<br/>用户',
          title:'终端用户'
        }
      ],
      types: [
        {
          name: "AKG",
          active: false,
        },
      ],
      logos: [
        {
          url: require("../assets/img/general/akg-logo.png"),
          active: false,
        },
      ],
      openid: "",
      clubsecret:''
    };
  },
  created() {
    this.openid = getUrlString("openid");
    this.clubsecret = getUrlString("secret")
    this.initData();
    // this.clubsecret = localStorage.getItem('clubsecret');
    // this.showZX = this.clubsecret?true:false;
    if(this.openid && !this.clubsecret){
      this.showZX = false
    } else  if(!this.openid && this.clubsecret){
      this.showZX = true
    }
  },
  methods: {
    initData() {
      const param = {
        action: "getClubUser",
        openid: this.openid,
        secret:this.clubsecret
      };
      getData(param).then((res) => {
        if (res.code == 0) {
          this.logos = res.brand.map((item) => {
            return {
              ...item,
              logo: env.imgUrl + item.logo,
              active: false,
            };
          });
          this.types = res.appCaseTypeList.map((item) => {
            return {
              ...item,
              active: false,
            };
          });
        } else {
          showToast(res.msg);
        }
      });
    },
    getRole(index) {
      this.curr = index;
    },
    getPlace(index) {
      // this.active = index;
      this.types[index].active = !this.types[index].active;
    },
    setOpacity(index) {
      // this.logoAct = index;

      this.logos[index].active = !this.logos[index].active;
    },
    clearInfo() {
      showConfirmDialog({
        // title: '标题',
        message: "您确定要删除您在哈曼国际的账户信息及数据吗？",
      })
        .then(() => {
          // on confirm
          //localStorage.removeItem('clubsecret');
          this.delClubUser();
        })
        .catch(() => {
          // on cancel
        });
    },
    delClubUser(){
      const param = {
        action:'delClubUser',
        secret:this.clubsecret
      }
      getData(param).then(res => {
        if(res.code == 0){
          showToast('账户信息删除成功');
          this.$router.push({
            name:'index',
          })
        } else {
          showToast(res.msg)
        }
      })
    },

    submit() {
      if(this.curr<0){
        return  showToast('请选择您的身份')
      }

      const identity = this.things[this.curr].title;
      
      const logos = this.logos.filter(item => {
        return item.active
      })
      const brandArr = logos.map(item => item.secret);
      const brand= brandArr.join(',')
      if(!brandArr.length){
        return  showToast('请选择品牌')
      }

      //types
      const types = this.types.filter(item => {
        return item.active
      })
      const typesArr = types.map(item => item.secret);
      const scene = typesArr.join(',')
      if(!typesArr.length){
        return  showToast('请选择场景')
      }
      if(!/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(this.email)){
        return showToast('请输入正确的邮箱格式')
      }
      if(!this.namer.trim().length){
        return  showToast('请输入您的姓名')
      }
      if(!this.company.trim().length){
        return  showToast('请输入您的公司')
      }
      console.log('scene--->', scene);
      
      const param = {
        action:'saveClubUser',
        openid:this.openid,
        brand,
        scene,
        email:this.email,
        namer:this.namer,
        company:this.company,
        identity
      }
      getData(param).then(res => {
        if(res.code == 0){
          const secret = res.userData.secret
          showToast('注册成功')
          this.$router.push({
            name:'home',
            query:{
              secret
            }
          })
          localStorage.setItem('clubsecret',secret);
          // localStorage.setItem('openid',res.userData.openid);
        } else {
          showToast(res.msg)
        }
      })
      
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  .club-cont {
    padding: 0 0.4rem;
  }
  .club-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.4rem 0 0.2rem;
    .club-txt {
      h4 {
        color: #0064a0;
        font-size: 0.3rem;
        margin-bottom: 0.15rem;
      }
      p {
        font-size: 0.24rem;
      }
    }
    .cancel {
      text-align: center;
      img {
        width: 0.36rem;
        height: 0.36rem;
        display: block;
        margin: 0 auto;
      }
      p {
        font-size: 0.26rem;
        margin-top: 0.06rem;
      }
    }
  }
  .re-form {
    margin-top: 0.3rem;
    input {
      height: 0.62rem;
      font-size: 0.26rem;
      width: 100%;
      display: block;
      padding: 0 0.1rem;
      box-sizing: border-box;
      margin-bottom: 0.26rem;
      border: 1px solid #9c9c9c;
    }
  }
  .club-title {
    font-size: 0.24rem;
    margin: 0.5rem 0 0.3rem;
  }
  .things {
    display: flex;
    justify-content: space-around;
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 1.02rem;
      height: 1.02rem;

      font-size: 0.24rem;

      border-radius: 50%;
      text-align: center;
      line-height: 1.2;
      background-color: #eee;
      &.active {
        background-color: #3db5e7;
        color: #fff;
      }
    }
  }
  .types {
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-right: -0.2rem;
    li {
      border-radius: 0.1rem;
      justify-content: space-between;
      text-align: center;
      margin-bottom: 0.2rem;
      justify-content: center;
      align-items: center;
      margin-right: 0.11rem;
      &.active {
        background-color: #3db5e7;
        color: #fff;
      }
    }
  }
  .logos {
    display: flex;
    justify-content: center;
    margin-bottom: 0.35rem;
    width: 100%;
    flex-wrap: wrap;
    margin: 0 auto;
    img {
      opacity: 0.5;
      width: 1rem;
      height: 1rem;
      margin: 0 0.1rem;
      &.active {
        opacity: 1;
      }
    }
  }
  .btn-zone {
    margin: 0.4rem 1.6rem;
  }
}
.agree {
  display: flex;
  align-items: center;
  font-size: 0.24rem;
  color: #828282;
  padding-top: 0.2rem;
  // border-top: 1px solid rgb(235,237,240);
  span {
    margin-left: 0.1rem;
  }
}
.cont {
  width: 100%;
  font-size: 0.24rem;
  line-height: 1.5;
  padding: 0.3rem 0.2rem;
  box-sizing: border-box;
  height: 80vh;
  overflow-y: auto;
}
</style>
