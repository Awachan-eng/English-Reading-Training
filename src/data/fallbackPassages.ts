import { PassageData } from '../types';

export const FALLBACK_PASSAGES: Record<string, PassageData[]> = {
  easy: [
    {
      id: 'easy-urban-gardens',
      title: 'The Rise of Urban Rooftop Gardens',
      difficulty: 'easy',
      topic: 'Environment & City Life',
      wordCount: 326,
      passage: `In recent years, many large cities around the world have seen an exciting transformation. Empty rooftops that used to sit barren under the sun are now turning into lush green gardens. These rooftop farms provide far more than just pleasant views for office workers and local residents.

First and foremost, urban gardens play a crucial role in lowering city temperatures. Concrete buildings and asphalt streets absorb heat throughout the day, creating what scientists call the "urban heat island effect." When plants are cultivated on rooftops, their leaves naturally cool the surrounding air through a process known as evapotranspiration. Studies show that buildings with green roofs can reduce their cooling costs by up to twenty percent during hot summer months.

Additionally, rooftop gardens contribute significantly to local food production. Many city residents do not have access to fresh vegetables grown without synthetic chemicals. Urban agriculture allows community volunteers and local schools to produce tomatoes, lettuce, and herbs just steps away from where people live. This drastically cuts down on the energy required to transport groceries from rural farms, which in turn reduces greenhouse gas emissions from delivery trucks.

Moreover, these green spaces provide unexpected psychological benefits. Modern urban life is often busy and stressful. Spending just fifteen minutes surrounded by blooming plants and singing birds can lower blood pressure and improve mental health. In Tokyo and New York, hospitals have even begun establishing rooftop gardens to help patients recover faster after surgery.

However, building a rooftop garden is not without challenges. Owners must ensure that the building's structure is strong enough to support heavy wet soil. They also need to install reliable drainage systems to prevent water leaks. Despite these technical hurdles, governments are now offering tax discounts to encourage building owners to adopt this sustainable practice. As cities continue to expand, rooftop gardens represent a hopeful vision of how human beings and nature can coexist harmoniously in urban environments.`,
      keySentences: [
        'When plants are cultivated on rooftops, their leaves naturally cool the surrounding air through a process known as evapotranspiration.',
        'This drastically cuts down on the energy required to transport groceries from rural farms, which in turn reduces greenhouse gas emissions from delivery trucks.',
        'In Tokyo and New York, hospitals have even begun establishing rooftop gardens to help patients recover faster after surgery.',
        'Owners must ensure that the building\'s structure is strong enough to support heavy wet soil.',
        'As cities continue to expand, rooftop gardens represent a hopeful vision of how human beings and nature can coexist harmoniously in urban environments.'
      ],
      japaneseTranslation: `近年、世界中の多くの大都市で刺激的な変化が起きています。かつて太陽の下で放置されていた何もない屋上が、今や緑豊かな屋上庭園へと生まれ変わっています。これらの屋上農園は、オフィスワーカーや地域住民に心地よい景色を提供する以上の大きな価値をもたらしています。

まず第一に、都市の庭園は都市の気温を下げる上で極めて重要な役割を果たします。コンクリートの建物やアスファルトの道路は日中に熱を吸収し、科学者が「ヒートアイランド現象」と呼ぶ状態を作り出します。屋上で植物が育てられると、その葉が蒸散と呼ばれるプロセスを通じて周囲の空気を自然に冷やします。研究によると、屋上緑化を施した建物は暑い夏の冷房費用を最大20%削減できることが示されています。

さらに、屋上庭園は地域の食糧生産にも大きく貢献しています。多くの都市住民は、化学農薬を使わずに栽培された新鮮な野菜を手に入れることが困難です。都市型農業により、ボランティアや地元の学校が生鮮野菜を生活圏のすぐそばで収穫できるようになりました。これにより、遠方の農場から食料を運ぶための輸送エネルギーが大幅に削減され、トラックによる温室効果ガスの排出も抑えられます。

加えて、こうした緑地は思いがけない心理的恩恵ももたらします。現代の都市生活は多忙でストレスに満ちています。植物や小鳥に囲まれて15分過ごすだけで、血圧が下がり精神的な健康が向上します。東京やニューヨークでは、手術後の患者の回復を早めるために病院が屋上庭園を整備し始めています。

しかしながら、屋上庭園の建設には課題もあります。建物の構造が重い湿った土を支えられるほど頑丈であるか確認しなければなりませんし、漏水を防ぐ確実な排水システムも必要です。こうした技術的障壁があるものの、持続可能な取り組みを後押しするために減税措置を設ける自治体も増えています。都市が広がり続ける中、屋上庭園は人と自然が調和して共存する希望に満ちた未来像を示しています。`,
      vocabulary: [
        { word: 'barren', meaning: '荒涼とした、植物の育たない', partOfSpeech: '形容詞' },
        { word: 'evapotranspiration', meaning: '蒸発散作用（植物から水分が蒸発すること）', partOfSpeech: '名詞' },
        { word: 'synthetic', meaning: '合成の、人工的な', partOfSpeech: '形容詞' },
        { word: 'coexist', meaning: '共存する', partOfSpeech: '動詞' },
        { word: 'hurdle', meaning: '障害、ハードル', partOfSpeech: '名詞' }
      ],
      questions: [
        {
          id: 1,
          question: 'According to the second paragraph, how do rooftop plants help cool urban environments?',
          options: [
            'By reflecting sunlight back into space through metallic soil',
            'By releasing moisture from their leaves via evapotranspiration',
            'By generating artificial wind currents around skyscrapers',
            'By absorbing rainfall and turning it into solid ice',
            'By blocking car exhaust fumes before they reach the ground'
          ],
          correctAnswer: 1,
          explanation: '第2段落の「When plants are cultivated on rooftops, their leaves naturally cool the surrounding air through a process known as evapotranspiration.（蒸散と呼ばれるプロセスにより葉から水分を放出して空気を冷やす）」から選択肢Bが正解です。',
          questionType: '詳細一致',
          keyReferencePhrase: 'leaves naturally cool the surrounding air through a process known as evapotranspiration'
        },
        {
          id: 2,
          question: 'Why does local food production on rooftops reduce greenhouse gas emissions?',
          options: [
            'It replaces all industrial manufacturing plants in the suburbs',
            'It eliminates the need for water pipes inside office buildings',
            'It minimizes the fuel needed to transport food from distant farms',
            'It converts excess carbon monoxide directly into electricity',
            'It prevents city dwellers from eating red meat and dairy'
          ],
          correctAnswer: 2,
          explanation: '第3段落の「This drastically cuts down on the energy required to transport groceries from rural farms, which in turn reduces greenhouse gas emissions from delivery trucks.（遠方の農場から食料を輸送するエネルギーを劇的に削り、配送トラックの温室効果ガス排出を減らす）」に合致する選択肢Cが正解です。',
          questionType: '理由・因果関係',
          keyReferencePhrase: 'cuts down on the energy required to transport groceries from rural farms'
        },
        {
          id: 3,
          question: 'What psychological advantage of rooftop gardens is mentioned in the fourth paragraph?',
          options: [
            'They permanently cure severe neurological diseases',
            'They increase worker productivity by seventy percent',
            'They lower blood pressure and relieve everyday stress',
            'They allow patients to complete their surgery without doctors',
            'They completely replace the need for physical exercise'
          ],
          correctAnswer: 2,
          explanation: '第4段落に「Spending just fifteen minutes surrounded by blooming plants and singing birds can lower blood pressure and improve mental health.（15分植物や鳥に囲まれるだけで血圧を下げ精神的健康を向上させる）」とあり、選択肢Cが合致します。',
          questionType: '詳細一致',
          keyReferencePhrase: 'can lower blood pressure and improve mental health'
        },
        {
          id: 4,
          question: 'What is one major difficulty building owners encounter when setting up a green roof?',
          options: [
            'Finding volunteers willing to water the plants during weekends',
            'Obtaining seeds that can survive without any sunlight',
            'Making sure the building can withstand the weight of moist soil',
            'Convincing local hospitals to accept their vegetables',
            'Preventing wild birds from visiting the garden'
          ],
          correctAnswer: 2,
          explanation: '第5段落の「Owners must ensure that the building\'s structure is strong enough to support heavy wet soil.（湿った重い土を支える十分な強度があるか確認しなければならない）」に対応する選択肢Cが正解です。',
          questionType: '詳細一致',
          keyReferencePhrase: 'structure is strong enough to support heavy wet soil'
        },
        {
          id: 5,
          question: 'What is the main idea of the entire passage?',
          options: [
            'Traditional rural farms will soon disappear due to city expansions',
            'Rooftop gardens offer environmental and wellness benefits despite some structural challenges',
            'Architects must focus exclusively on reducing summer electricity expenses',
            'Governments should penalize buildings that fail to cultivate green plants',
            'Hospitals are the only facilities suitable for building sustainable gardens'
          ],
          correctAnswer: 1,
          explanation: '文章全体を通して、屋上庭園が環境冷却や食糧自給、心理的健康などの多様なメリットをもたらす一方、建築強度の課題はあるものの持続可能な共存策として普及しているという要旨を述べているため選択肢Bが正解です。',
          questionType: '要旨把握',
          keyReferencePhrase: 'rooftop gardens represent a hopeful vision of how human beings and nature can coexist harmoniously'
        }
      ]
    }
  ],
  normal: [
    {
      id: 'normal-deep-sea-exploration',
      title: 'Unlocking the Mysteries of the Abyssal Ocean',
      difficulty: 'normal',
      topic: 'Marine Science & Technology',
      wordCount: 378,
      passage: `For centuries, human beings believed that the deepest trenches of the world's oceans were entirely desolate wastelands. At depths exceeding four thousand meters, sunlight cannot penetrate, water temperatures hover just above freezing, and hydrostatic pressure reaches crushing levels equal to the weight of an elephant balanced on a postage stamp. It seemed biologically impossible for complex organisms to survive in such an unforgiving environment.

However, scientific expeditions conducted in the late twentieth century revolutionized our understanding of marine biology. In 1977, oceanographers exploring the Galápagos Rift discovered hydrothermal vents—fissures on the seabed that spew mineral-rich water heated by subterranean volcanic activity. Astonishingly, thriving communities of giant tube worms, blind shrimp, and pale crabs were discovered clustered around these underwater geysers. Unlike terrestrial ecosystems that depend directly on photosynthesis, these abyssal creatures thrive through chemosynthesis. Bacteria oxidize toxic hydrogen sulfide compounds emitted by the vents, converting chemical energy into nutritious organic matter that forms the base of this unique food web.

Beyond expanding our knowledge of biodiversity, abyssal exploration holds profound implications for contemporary medicine and biotechnology. Organisms dwelling in the deep sea have evolved unique biochemical adaptations, such as specialized enzymes that remain stable under extreme pressure and anti-inflammatory molecules that protect cell membranes. Pharmaceutical researchers are currently isolating compounds from deep-sea sponges and microbes to develop next-generation antibiotics that can overcome resistant bacterial strains.

Nevertheless, deep-sea exploration faces mounting ethical and ecological dilemmas. The seabed is rich in polymetallic nodules containing valuable metals such as cobalt, nickel, and copper, which are essential for producing electric vehicle batteries and renewable energy equipment. Commercial mining corporations are eager to dredge the ocean floor to harvest these precious minerals. Marine conservationists vehemently warn that scraping the abyssal plain could obliterate fragile benthic ecosystems before scientists even have the opportunity to catalog them. Because deep-sea organisms mature and reproduce at remarkably slow rates, environmental damage inflicted today could take centuries to recover.

To prevent irreversible ecological catastrophe, international regulatory bodies must establish strict marine protected areas and binding conservation treaties. The abyss is not a barren desert awaiting industrial exploitation; it is a vital reservoir of planetary biodiversity that demands our utmost protection and scientific humility.`,
      keySentences: [
        'Unlike terrestrial ecosystems that depend directly on photosynthesis, these abyssal creatures thrive through chemosynthesis.',
        'Pharmaceutical researchers are currently isolating compounds from deep-sea sponges and microbes to develop next-generation antibiotics that can overcome resistant bacterial strains.',
        'The seabed is rich in polymetallic nodules containing valuable metals such as cobalt, nickel, and copper, which are essential for producing electric vehicle batteries and renewable energy equipment.',
        'Marine conservationists vehemently warn that scraping the abyssal plain could obliterate fragile benthic ecosystems before scientists even have the opportunity to catalog them.',
        'To prevent irreversible ecological catastrophe, international regulatory bodies must establish strict marine protected areas and binding conservation treaties.'
      ],
      japaneseTranslation: `何世紀もの間、人類は世界の最も深い海底の海溝が完全な荒野であると信じていました。水深4,000メートルを超える深海では、太陽光は届かず、水温は氷点寸前で、水圧は切手の上にゾウを乗せたほどの圧倒的な力に達します。このような過酷な環境で複雑な生物が生息することは、生物学的に不可能であると考えられていました。

しかし、20世紀後半に行われた科学調査が海洋生物学の認識を劇的に変えました。1977年、ガラパゴス海裂を調査していた海洋学者たちが熱水噴出孔を発見しました。驚くべきことに、これらの海底間欠泉の周囲には、巨大なハオリムシ、目のないエビ、白いカニなどの繁栄した生態系が密集していました。光合成に依存する陸上生態系とは異なり、これらの深海生物は「化学合成」によって繁栄しています。細菌が噴出孔から放出される有毒な硫化水素化合物を酸化し、化学エネルギーを有機物に変換して独特の食物連鎖の土台を築いています。

生物多様性の理解を深めるだけでなく、深海探査は現代の医療やバイオテクノロジーにも大きな意味を持ちます。深海生物は極度の圧力下でも安定した特殊な酵素など、独自の生化学的適応を獲得してきました。製薬研究者は、耐性菌を克服できる次世代の抗生物質を開発するため、深海の海綿や微生物から化合物を抽出しています。

しかしながら、深海探査は倫理的・生態学的ジレンマにも直面しています。海底には電気自動車のバッテリーや再生可能エネルギー機器に不可欠なコバルトやニッケル、銅などの金属を含む多金属団塊が豊富に存在します。商業採掘企業はこれらの貴重な鉱物を浚渫しようと熱望しています。海洋保護活動家は、海底を浚渫すれば、科学者が調査・分類する前に脆弱な海底生態系が破壊されかねないと強く警告しています。深海生物の成長と繁殖は極めて遅いため、一度傷ついた環境が回復するには数百年を要する可能性があります。

不可逆的な生態学的破滅を防ぐため、国際機関は厳格な海洋保護区と拘束力のある保護条約を確立しなければなりません。深海は工業的搾取を待つ不毛の砂漠ではなく、人類の謙虚さと保護を必要とする地球の生命の重要な宝庫なのです。`,
      vocabulary: [
        { word: 'chemosynthesis', meaning: '化学合成（無機物の酸化エネルギーから有機物を作る作用）', partOfSpeech: '名詞' },
        { word: 'obliterate', meaning: '完全に破壊する、消し去る', partOfSpeech: '動詞' },
        { word: 'nodule', meaning: '団塊、小結節', partOfSpeech: '名詞' },
        { word: 'benthic', meaning: '底生の、海底の', partOfSpeech: '形容詞' },
        { word: 'fissure', meaning: '裂け目、割れ目', partOfSpeech: '名詞' }
      ],
      questions: [
        {
          id: 1,
          question: 'How do ecosystems around hydrothermal vents sustain themselves without sunlight?',
          options: [
            'By storing residual solar energy that sinks from surface waters',
            'Through chemosynthetic bacteria oxidizing toxic sulfur compounds',
            'By absorbing thermal radiation directly through their transparent skin',
            'Through radioactive decay occurring inside volcanic bedrock',
            'By consuming plant matter carried down by ocean currents'
          ],
          correctAnswer: 1,
          explanation: '第2段落に「these abyssal creatures thrive through chemosynthesis. Bacteria oxidize toxic hydrogen sulfide compounds emitted by the vents, converting chemical energy into nutritious organic matter」とあり、化学合成細菌が硫黄化合物を酸化することで栄養を作っているため選択肢Bが正解です。',
          questionType: '理由・因果関係',
          keyReferencePhrase: 'thrive through chemosynthesis. Bacteria oxidize toxic hydrogen sulfide compounds'
        },
        {
          id: 2,
          question: 'Why are pharmaceutical scientists interested in organisms found in the deep ocean?',
          options: [
            'They hope to extract minerals to manufacture surgical scalpels',
            'They believe deep-sea organisms possess compounds to create novel antibiotics',
            'They want to train blind shrimp to detect underwater contamination',
            'They are testing whether deep-sea water can cure common dehydration',
            'They plan to replace chemical laboratories with submarine research stations'
          ],
          correctAnswer: 1,
          explanation: '第3段落の「Pharmaceutical researchers are currently isolating compounds from deep-sea sponges and microbes to develop next-generation antibiotics that can overcome resistant bacterial strains.」より、耐性菌を克服する新抗生物質開発につながるため選択肢Bが正解です。',
          questionType: '詳細一致',
          keyReferencePhrase: 'isolating compounds from deep-sea sponges and microbes to develop next-generation antibiotics'
        },
        {
          id: 3,
          question: 'What commercial motivation drives corporations to mine the deep seabed?',
          options: [
            'Constructing underwater luxury hotels for wealthy tourists',
            'Harvesting rare pearls and shells for the jewelry market',
            'Extracting crucial metals required for electric vehicles and green energy',
            'Drilling for underground freshwater to supply coastal cities',
            'Capturing exotic deep-sea fish for commercial seafood dining'
          ],
          correctAnswer: 2,
          explanation: '第4段落の「The seabed is rich in polymetallic nodules containing valuable metals such as cobalt, nickel, and copper, which are essential for producing electric vehicle batteries and renewable energy equipment.」から、EVバッテリー等に必要な希少金属の採取が目的であるため選択肢Cが正解です。',
          questionType: '詳細一致',
          keyReferencePhrase: 'valuable metals such as cobalt, nickel, and copper, which are essential for producing electric vehicle batteries'
        },
        {
          id: 4,
          question: 'Why are conservationists especially concerned about damage caused by seabed mining?',
          options: [
            'Mining machinery generates massive noise that disturbs commercial airplanes',
            'Deep-sea species mature and reproduce so slowly that recovery could take centuries',
            'It will immediately cause giant tsunamis along continental shorelines',
            'Corporations refuse to share any profits with local fishing communities',
            'Dredging equipment permanently alters the gravitational pull of the Earth'
          ],
          correctAnswer: 1,
          explanation: '第4段落末尾の「Because deep-sea organisms mature and reproduce at remarkably slow rates, environmental damage inflicted today could take centuries to recover.（深海生物の成熟と繁殖が極めて遅く、回復に数百年かかる恐れがある）」に合致する選択肢Bが正解です。',
          questionType: '理由・因果関係',
          keyReferencePhrase: 'deep-sea organisms mature and reproduce at remarkably slow rates, environmental damage inflicted today could take centuries to recover'
        },
        {
          id: 5,
          question: 'What is the author\'s primary message in the final paragraph?',
          options: [
            'Deep-sea mining must proceed quickly before other nations claim the territory',
            'Scientists should abandon deep-sea research due to extreme financial expenses',
            'Strict international regulations are needed to protect vital deep-sea biodiversity',
            'Renewable energy technology is too dangerous to pursue in modern industry',
            'Photosynthesis is vastly superior to chemosynthesis in evolutionary history'
          ],
          correctAnswer: 2,
          explanation: '最終段落の「To prevent irreversible ecological catastrophe, international regulatory bodies must establish strict marine protected areas and binding conservation treaties... vital reservoir of planetary biodiversity that demands our utmost protection」から、厳格な国際規制によって深海の生物多様性を保護すべきという主張であるため選択肢Cが正解です。',
          questionType: '筆者の主張',
          keyReferencePhrase: 'international regulatory bodies must establish strict marine protected areas and binding conservation treaties'
        }
      ]
    }
  ],
  hard: [
    {
      id: 'hard-cognitive-heuristics',
      title: 'Cognitive Architecture and the Pitfalls of Intuitive Reasoning',
      difficulty: 'hard',
      topic: 'Cognitive Psychology & Behavioral Economics',
      wordCount: 472,
      passage: `For much of the Enlightenment and the classical economic era, scholars operated under the assumption of the "rational actor"—an idealized human agent who methodically weighs probabilistic outcomes, aggregates all relevant empirical evidence, and arrives at decisions that maximize personal utility. However, the seminal work of behavioral psychologists Daniel Kahneman and Amos Tversky dismantled this intellectual orthodoxy, revealing that human cognitive architecture relies heavily on intuitive shortcuts, known technically as heuristics. While these cognitive heuristics served vital evolutionary functions in ancestral environments characterized by scarcity and immediate physical peril, they systematically distort contemporary decision-making in complex modern societies.

In their dual-process theoretical framework, cognitive scientists delineate two distinct modes of thinking: System 1 and System 2. System 1 operates automatically, rapidly, and with negligible conscious exertion. It governs involuntary physiological responses, intuitive appraisals of social atmospheres, and reflexive pattern-matching. Conversely, System 2 coordinates deliberate, analytical contemplation, demanding focused mental energy and working memory. Because sustained analytical processing incurs significant metabolic and psychological costs, the human brain functions as an aggressive "cognitive miser," perpetually defaulting to the effortless approximations of System 1 unless provoked by explicit anomalies.

The systemic hazard emerges when System 1 insidiously substitutes complex queries with simplistic proxies without alerting conscious awareness. A prominent manifestation is the availability heuristic, wherein individuals judge the likelihood of an occurrence based on the cognitive ease with which salient exemplars come to mind. For instance, following sensationalized media coverage of an aviation catastrophe, travelers frequently overestimate the perils of commercial flight while remaining blithely indifferent to the exponentially higher statistical lethality of automobile transit. Similarly, the confirmation bias compels individuals to selectively perceive, interpret, and retain evidence that reinforces their preexisting ideological dogmas while aggressively dismissing contradictory data as anomalous or fraudulent.

In contemporary society, these architectural limitations are exacerbated by digital algorithms designed to optimize engagement. Social media platforms curate algorithmic feeds that feed our confirmation biases, transforming epistemic vulnerabilities into polarized echo chambers. Furthermore, in arenas such as macroeconomic policy, clinical medicine, and judicial sentencing, the stubborn illusion of intuitive validity can precipitate catastrophic miscarriages of justice and systemic mismanagement. Professionals frequently confuse subjective confidence—an internal feeling derived merely from narrative coherence—with objective accuracy.

Mitigating these cognitive deficiencies requires deliberate institutional de-biasing rather than naive appeals to individual willpower. Organizations must implement formalized procedural scaffolds, such as adversarial red-teaming, structured algorithmic checklists, and blinded peer assessments that decouple empirical deliberation from personal ego. Recognizing that human intuition is an evolved heuristic mechanism rather than an infallible compass constitutes the indispensable prerequisite for constructing truly rational institutions.`,
      keySentences: [
        'Because sustained analytical processing incurs significant metabolic and psychological costs, the human brain functions as an aggressive "cognitive miser," perpetually defaulting to the effortless approximations of System 1 unless provoked by explicit anomalies.',
        'A prominent manifestation is the availability heuristic, wherein individuals judge the likelihood of an occurrence based on the cognitive ease with which salient exemplars come to mind.',
        'Similarly, the confirmation bias compels individuals to selectively perceive, interpret, and retain evidence that reinforces their preexisting ideological dogmas while aggressively dismissing contradictory data as anomalous or fraudulent.',
        'Professionals frequently confuse subjective confidence—an internal feeling derived merely from narrative coherence—with objective accuracy.',
        'Mitigating these cognitive deficiencies requires deliberate institutional de-biasing rather than naive appeals to individual willpower.'
      ],
      japaneseTranslation: `啓蒙時代から古典派経済学の時代にかけて、学者たちは「合理的経済人」という仮定のもとで思索を進めていました。これは、確率論的な結果を規則正しく天秤にかけ、すべての関連証拠を集約し、個人の効用を最大化する決断を下す理想化された人間像です。しかし、行動心理学者のダニエル・カーネマンとエイモス・トベルスキーによる先駆的研究はこの通説を覆し、人間の認知構造が「ヒューリスティクス」と呼ばれる直観的近道に大きく依存していることを暴きました。これらの認知ヒューリスティクスは、飢餓や差し迫った危険に晒されていた太古の環境においては重要な進化的役割を果たしたものの、複雑な現代社会においては意思決定を系統的に歪めています。

二重過程理論の枠組みにおいて、認知科学者は「システム1」と「システム2」という2つの思考様式を区別します。システム1は自動的かつ迅速に、意識的努力をほとんど伴わずに機能します。不随意な生理的反応や社会的空気の直感的評価、反射的なパターンマッチングを司ります。対照的に、システム2は意図的で分析的な熟考を調整し、集中した精神的エネルギーと作業記憶を要求します。持続的な分析作業は大きな代謝的・精神的コストを消費するため、人間の脳は「認知の倹約家（コグニティブ・マイザー）」として機能し、明白な異常に直面しない限り、常に安易なシステム1の概算へと退行してしまうのです。

この構造的危険は、システム1が意識に警告を発することなく、複雑な問いを短絡的な代用品へと巧妙にすり替える際に表面化します。顕著な例が「利用可能性ヒューリスティクス」であり、個人は鮮明な事例が頭に浮かびやすいかどうかに基づいて出来事の発生確率を判断します。例えば、航空機事故の大々的な報道の後、旅行者は飛行機の危険性を過大評価する一方で、統計的により致死率の高い自動車移動には無頓着なままです。同様に「確証バイアス」は、既存の信条を補強する証拠を選択的に受容し、矛盾するデータを不都合な例外として退けるよう仕向けます。

現代社会では、エンゲージメントを最大化するデジタルアルゴリズムによってこうした認知の弱点がさらに悪化しています。ソーシャルメディアは確証バイアスを煽り、認識論的な脆弱性を分極化したエコーチェンバーへと変質させます。さらに、政策決定や医療、司法判断においても、直観の正しさという頑迷な幻想が悲惨な誤審や失政を引き起こします。専門家でさえ、物語の辻褄が合っているという感覚に過ぎない「主観的確信」を「客観的正確さ」と混同しがちです。

こうした認知の欠陥を是正するには、個人の意志の力に頼るのではなく、制度的な「バイアス除去（デバイアス）」が必要です。組織は、敵対的検証チーム（レッドチーム）や構造化されたチェックリスト、ブラインド評価など、客観的審議と個人のプライドを切り離す仕組みを整備しなければなりません。人間の直観が万能の羅針盤ではなく進化の産物としてのヒューリスティクスに過ぎないと認めることこそが、真に合理的な社会を構築するための不可欠な前提条件なのです。`,
      vocabulary: [
        { word: 'orthodoxy', meaning: '正統派の教義、通説', partOfSpeech: '名詞' },
        { word: 'heuristic', meaning: 'ヒューリスティクス、認知的近道・発見法', partOfSpeech: '名詞' },
        { word: 'delineate', meaning: '明確に区別する、輪郭を描く', partOfSpeech: '動詞' },
        { word: 'miser', meaning: 'けち、出し惜しみする者', partOfSpeech: '名詞' },
        { word: 'epistemic', meaning: '認識論的な、知識に関する', partOfSpeech: '形容詞' }
      ],
      questions: [
        {
          id: 1,
          question: 'Why does the human brain default to System 1 according to the second paragraph?',
          options: [
            'System 1 possesses superior computational accuracy compared to System 2',
            'Analytical processing via System 2 requires substantial mental and metabolic energy',
            'Evolution has completely eliminated human reliance on working memory',
            'System 1 operates only when individuals are asleep or deeply relaxed',
            'Sensory organs cannot send empirical signals directly to System 2'
          ],
          correctAnswer: 1,
          explanation: '第2段落に「Because sustained analytical processing incurs significant metabolic and psychological costs, the human brain functions as an aggressive "cognitive miser," perpetually defaulting to the effortless approximations of System 1」とあり、システム2は多大な代謝的・精神的エネルギーを消費するため、省エネのためにシステム1に依存することが説明されています（選択肢B）。',
          questionType: '理由・因果関係',
          keyReferencePhrase: 'sustained analytical processing incurs significant metabolic and psychological costs'
        },
        {
          id: 2,
          question: 'What psychological phenomenon is illustrated by the airline passenger example in the third paragraph?',
          options: [
            'The sunk-cost fallacy',
            'The availability heuristic',
            'The hindsight bias',
            'The fundamental attribution error',
            'The placebo effect'
          ],
          correctAnswer: 1,
          explanation: '第3段落冒頭の「A prominent manifestation is the availability heuristic, wherein individuals judge the likelihood of an occurrence based on the cognitive ease with which salient exemplars come to mind」に続き航空機事故の例が挙げられているため、利用可能性ヒューリスティクス（選択肢B）が正解です。',
          questionType: '文脈・語彙推論',
          keyReferencePhrase: 'A prominent manifestation is the availability heuristic'
        },
        {
          id: 3,
          question: 'According to the fourth paragraph, what dangerous confusion often affects professionals in critical fields?',
          options: [
            'Confusing legal precedent with moral philosophy',
            'Mistaking subjective confidence derived from coherent stories for objective accuracy',
            'Treating statistical regression as proof of biological evolution',
            'Believing that digital algorithms can feel human empathy',
            'Assuming that economic growth inevitably guarantees social happiness'
          ],
          correctAnswer: 1,
          explanation: '第4段落末尾の「Professionals frequently confuse subjective confidence—an internal feeling derived merely from narrative coherence—with objective accuracy.」に合致する選択肢Bが正解です。',
          questionType: '詳細一致',
          keyReferencePhrase: 'confuse subjective confidence—an internal feeling derived merely from narrative coherence—with objective accuracy'
        },
        {
          id: 4,
          question: 'Why are personal willpower and conscious effort insufficient to counter cognitive biases?',
          options: [
            'Willpower is an obsolete concept with no biological basis',
            'Heuristic substitutions operate unconsciously below the threshold of awareness',
            'Social media platforms legally forbid employees from checking data',
            'Confirmation bias affects only individuals without university degrees',
            'System 2 is physically disconnected from human speech centers'
          ],
          correctAnswer: 1,
          explanation: '第3段落の「System 1 insidiously substitutes complex queries with simplistic proxies without alerting conscious awareness」および第5段落の構造的対策の必要性から、バイアスは無意識化で巧妙に働くため個人の意志の力だけでは防げず、選択肢Bが正解です。',
          questionType: '理由・因果関係',
          keyReferencePhrase: 'substitutes complex queries with simplistic proxies without alerting conscious awareness'
        },
        {
          id: 5,
          question: 'What solution does the author advocate in the final paragraph to overcome cognitive flaws?',
          options: [
            'Total elimination of democratic elections in favor of artificial intelligence',
            'Implementing structural institutional protocols such as checklists and adversarial teams',
            'Mandating intensive daily meditation for all financial and judicial leaders',
            'Encouraging professionals to trust their immediate gut feelings more boldly',
            'Restricting public access to statistical software and economic reports'
          ],
          correctAnswer: 1,
          explanation: '最終段落の「Organizations must implement formalized procedural scaffolds, such as adversarial red-teaming, structured algorithmic checklists, and blinded peer assessments」から、制度的・構造的な仕組み（チェックリストや敵対的検証チームなど）の導入を推奨しているため選択肢Bが正解です。',
          questionType: '筆者の主張',
          keyReferencePhrase: 'implement formalized procedural scaffolds, such as adversarial red-teaming, structured algorithmic checklists'
        }
      ]
    }
  ],
  master: [
    {
      id: 'master-epistemology-ai',
      title: 'Epistemic Opacity and the Hermeneutic Challenge of Artificial Reason',
      difficulty: 'master',
      topic: 'Philosophy of Mind & Machine Cognition',
      wordCount: 524,
      passage: `The rapid ascendancy of deep foundational neural architectures has precipitated an unprecedented epistemological crisis in contemporary philosophy and technological ethics. Throughout the canonical history of Western rationalism—from Aristotelian syllogisms to Cartesian deductive certainty—the legitimacy of knowledge was inextricably tethered to intelligibility. An inference was deemed epistemically justified only if the cognitive trajectory connecting premise to conclusion could be articulated, scrutinized, and defended in discursive prose. However, the emergence of multi-billion-parameter neural models has ruptured this venerable compact, confronting humanity with systems that demonstrate astonishing empirical efficacy while remaining profoundly opaque to human introspection.

This phenomenon, commonly characterized as "epistemic opacity," stems directly from the topological architecture of high-dimensional parameter spaces. Deep transformers synthesize statistical regularities across billions of latent vector dimensions, generating behavioral outputs through convoluted, non-linear geometric operations that possess no direct analog in natural human semantics. While computer scientists can readily inspect individual floating-point weights and trace backward gradients during backpropagation, this granular mechanical transparency fails to yield semantic interpretability. We are left in the disconcerting position of possessing mathematical omni-visibility at the micro-level while enduring complete narrative blindness at the macro-level. Consequently, an algorithmic diagnosis or legal prognosis may prove statistically irreproachable yet remain entirely unintelligible to the human mind seeking causal justification.

This divergence carries profound ramifications for moral accountability and institutional legitimacy. Modern legal jurisprudence and medical ethics rest upon the sacrosanct doctrine of the "right to an explanation." When a criminal defendant is denied bail or an oncology patient is refused an experimental therapy, the ethical dignity of the person demands a coherent causal justification, not an impenetrable probabilistic score from a statistical oracle. Delegating existential determinations to black-box models risks subordinating human agency to an inscrutable mathematical fatalism, alienating individuals from the rational foundations of societal governance.

Faced with this hermeneutic impasse, the emerging field of mechanistic interpretability endeavors to reverse-engineer high-dimensional representations into human-comprehensible concepts. Researchers employ techniques such as sparse autoencoders to isolate monosemantic latent features, hoping to decipher how abstract propositions are encoded across distributed artificial neurons. Yet substantial philosophical skepticism persists regarding whether human conceptual schemas are even capable of mapping the intricate geometries of machine cognition. If an artificial intelligence operates in thousands of conceptual dimensions simultaneously, attempting to compress that alien phenomenology into the linear syntax of human speech may constitute an intrinsically lossy and futile translation.

Ultimately, humanity must confront the paradoxical reality that intelligence and intelligibility are not universally coterminous. As artificial cognition outpaces biological constraints, we may be forced to choose between the utilitarian benefits of incomprehensible algorithmic brilliance and the humanist imperative of transparent moral accountability. Navigating this profound dialectic will determine not merely the trajectory of future technology, but the very meaning of human autonomy in an automated world.`,
      keySentences: [
        'An inference was deemed epistemically justified only if the cognitive trajectory connecting premise to conclusion could be articulated, scrutinized, and defended in discursive prose.',
        'We are left in the disconcerting position of possessing mathematical omni-visibility at the micro-level while enduring complete narrative blindness at the macro-level.',
        'When a criminal defendant is denied bail or an oncology patient is refused an experimental therapy, the ethical dignity of the person demands a coherent causal justification, not an impenetrable probabilistic score from a statistical oracle.',
        'If an artificial intelligence operates in thousands of conceptual dimensions simultaneously, attempting to compress that alien phenomenology into the linear syntax of human speech may constitute an intrinsically lossy and futile translation.',
        'Ultimately, humanity must confront the paradoxical reality that intelligence and intelligibility are not universally coterminous.'
      ],
      japaneseTranslation: `深層基盤モデルの急速な台頭は、現代哲学と技術倫理において前例のない認識論的危機を引き起こしました。西洋合理主義の歴史において、アリストテレスの三段論法からデカルトの演繹的確信に至るまで、知識の正当性は「理解可能性」と不可分に結びついていました。前提から結論へと至る思考の軌跡が言葉によって言語化され、精査され、弁護されて初めて、推論は認識論的に正当であると見なされてきたのです。しかし、数千億のパラメータを持つニューラルネットワークの出現はこの歴史的合意を破壊し、驚くべき実用性を発揮しながらも人間の内省には完全に不透明なシステムを突きつけました。

この「認識論的不透明性」と呼ばれる現象は、高次元パラメータ空間の幾何学的構造に直接起因します。深層トランスフォーマーは数十億の潜在ベクトル次元全体にわたる統計的規則性を統合し、人間の自然言語に直接対応するもののない複雑な非線形幾何学操作を通じて出力を生成します。個々の浮動小数点パラメータの重みを検査し、勾配降下を逆トレースすることは可能ですが、この微視的な機械的透明性は、意味論的な解釈可能性をもたらしません。私たちは、ミクロレベルでの数学的な完全可視性を持ちながら、マクロレベルでは完全な物語的盲目に耐えるという不安な立場に置かれています。その結果、アルゴリズムによる診断や司法判断は統計的には非の打ち所がなくても、因果関係の説明を求める人間には全く不可解なままとなります。

この乖離は、道徳的責任と制度的正当性に甚大な影響を及ぼします。近代法学や医療倫理は「説明を受ける権利」という神聖な教義に基づいています。保釈を拒否された被告や治療を断られた患者に対しては、因果関係のある一貫した説明が倫理的尊厳として求められるのであり、統計の神託による不可解な確率スコアではありません。ブラックボックスモデルに実存的決定を委ねることは、人間の主体性を不可知な数学的決定論に服従させ、社会統治の合理的基盤から人間を疎外する危険を孕んでいます。

この解釈学的袋小路に対し、「機械的解釈可能性（メカニスティック・インタープリタビリティ）」の研究は、高次元表現を人間が理解可能な概念へとリバースエンジニアリングしようと試みています。しかし、人間の概念体系が機械認知の複雑な幾何学を写像できるのかという点には根強い哲学的懐疑論が存在します。AIが数千の概念次元で同時に作動しているとすれば、その異質の現象学を人間の線形的な言語構文へと圧縮することは、本質的に情報が損なわれる無益な翻訳になりかねません。

究極的には、人類は「知能」と「理解可能性」が普遍的に一致するわけではないという逆説的現実に直面しなければなりません。理解不能なアルゴリズムの効用と、透明な道徳的説明責任という人間主義的要請のどちらを選ぶのか。この弁証法をどう切り抜けるかが、自律性の未来を決定づけるのです。`,
      vocabulary: [
        { word: 'inextricably', meaning: '密接に、切り離せないほどに', partOfSpeech: '副詞' },
        { word: 'hermeneutic', meaning: '解釈学的な、解釈に関する', partOfSpeech: '形容詞' },
        { word: 'coterminous', meaning: '境界を接する、同一の広がりを持つ', partOfSpeech: '形容詞' },
        { word: 'impasse', meaning: '袋小路、行き詰まり', partOfSpeech: '名詞' },
        { word: 'phenomenology', meaning: '現象学、知覚体験のあり方', partOfSpeech: '名詞' }
      ],
      questions: [
        {
          id: 1,
          question: 'According to the first paragraph, what criterion historically validated knowledge in Western rationalism?',
          options: [
            'Its practical utility in generating financial wealth',
            'The capacity to articulate and logically defend the reasoning process in prose',
            'Its total secrecy among aristocratic intellectual guilds',
            'Verification by mechanical calculation devices',
            'Unanimous agreement across all democratic assemblies'
          ],
          correctAnswer: 1,
          explanation: '第1段落の「the legitimacy of knowledge was inextricably tethered to intelligibility. An inference was deemed epistemically justified only if the cognitive trajectory connecting premise to conclusion could be articulated, scrutinized, and defended in discursive prose.」から、論理の道筋を言葉で明確に説明・弁護できること（選択肢B）が正解です。',
          questionType: '詳細一致',
          keyReferencePhrase: 'could be articulated, scrutinized, and defended in discursive prose'
        },
        {
          id: 2,
          question: 'What paradox does the author highlight regarding "epistemic opacity" in the second paragraph?',
          options: [
            'Engineers cannot program new weights without biological brains',
            'We have mathematical visibility at the micro-level but total narrative blindness at the macro-level',
            'Deep learning requires immense electrical power while generating freezing temperatures',
            'Computers can understand ancient languages better than modern speech',
            'Statistical algorithms always make errors when predicting physical events'
          ],
          correctAnswer: 1,
          explanation: '第2段落の「We are left in the disconcerting position of possessing mathematical omni-visibility at the micro-level while enduring complete narrative blindness at the macro-level.」に合致する選択肢Bが正解です。',
          questionType: '詳細一致',
          keyReferencePhrase: 'mathematical omni-visibility at the micro-level while enduring complete narrative blindness at the macro-level'
        },
        {
          id: 3,
          question: 'Why does the author object to delegating judicial and medical decisions to black-box models?',
          options: [
            'Black-box models require too much time to calculate basic arithmetic',
            'Human dignity requires coherent causal explanations rather than obscure probabilistic scores',
            'Doctors and judges would lose their financial employment immediately',
            'Patients and defendants would refuse to look at digital computer screens',
            'Artificial intelligence is completely incapable of processing legal documents'
          ],
          correctAnswer: 1,
          explanation: '第3段落の「When a criminal defendant is denied bail or an oncology patient is refused an experimental therapy, the ethical dignity of the person demands a coherent causal justification, not an impenetrable probabilistic score from a statistical oracle.」から、人間の尊厳には不可解な確率ではなく一貫した因果的説明が必要であるため選択肢Bが正解です。',
          questionType: '理由・因果関係',
          keyReferencePhrase: 'the ethical dignity of the person demands a coherent causal justification, not an impenetrable probabilistic score'
        },
        {
          id: 4,
          question: 'According to the fourth paragraph, why might mechanistic interpretability fail to resolve opacity?',
          options: [
            'Software developers refuse to publish their source code under open licenses',
            'Compressing multi-dimensional alien geometry into linear human language may be fundamentally lossy',
            'Sparse autoencoders have been legally outlawed by international privacy treaties',
            'Biological neurons emit chemical signals that destroy semiconductor chips',
            'Machine learning architectures are changing too slowly to observe progress'
          ],
          correctAnswer: 1,
          explanation: '第4段落の「If an artificial intelligence operates in thousands of conceptual dimensions simultaneously, attempting to compress that alien phenomenology into the linear syntax of human speech may constitute an intrinsically lossy and futile translation.」より、数千次元の構造を人間の線形言語に圧縮すること自体に限界があるため選択肢Bが正解です。',
          questionType: '理由・因果関係',
          keyReferencePhrase: 'attempting to compress that alien phenomenology into the linear syntax of human speech may constitute an intrinsically lossy and futile translation'
        },
        {
          id: 5,
          question: 'What fundamental tension is synthesized in the concluding paragraph?',
          options: [
            'The contest between software patents and academic freedom',
            'The divergence between incomprehensible algorithmic utility and transparent humanist accountability',
            'The competition between biological evolution and mechanical robotics for food supplies',
            'The debate over whether electricity should be generated by solar or nuclear energy',
            'The dispute between European and Asian philosophies of language'
          ],
          correctAnswer: 1,
          explanation: '最終段落の「we may be forced to choose between the utilitarian benefits of incomprehensible algorithmic brilliance and the humanist imperative of transparent moral accountability」から、理解不能な高い利便性（効用）と、透明な人間主義的説明責任との間の対立・選択がテーマであり選択肢Bが正解です。',
          questionType: '要旨把握',
          keyReferencePhrase: 'utilitarian benefits of incomprehensible algorithmic brilliance and the humanist imperative of transparent moral accountability'
        }
      ]
    }
  ]
};
