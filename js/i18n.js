// Self-contained client-side i18n dictionary (en, pt, es) — zero external dependencies, zero network requests.

export const SUPPORTED_LANGS = ['pt', 'en', 'es'];
export const DEFAULT_LANG = 'en';
export const STORAGE_KEY = 'cc-lang';

export const DICT = {
  en: {
    'seo.title': 'Castro Creative — AI marketing agency: video ads, product photos, websites and social posts',
    'seo.description': 'Castro Creative is an AI marketing agency. We make cinematic video ads, product and brand photos, websites and social posts, then set up the Meta campaigns that put them in front of people.',
    'seo.ogTitle': 'Castro Creative — AI marketing that makes people feel something',
    'seo.ogDescription': 'Cinematic AI video ads for brands, plus Meta campaign setup. Three ads per package, delivered in 48 hours.',

    'skip': 'Skip to content',
    'preloader.line': 'Loading the feelings',
    'cursor.play': 'Play',
    'lang.aria': 'Language',

    'nav.topAria': 'Castro Creative — back to top',
    'nav.primaryAria': 'Primary',
    'nav.mobileAria': 'Mobile',
    'nav.footerAria': 'Footer',
    'nav.work': 'Work',
    'nav.films': 'Films',
    'nav.brands': 'Brands',
    'nav.themes': 'Your theme',
    'nav.services': 'Services',
    'nav.process': 'Process',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.cta': 'Request a quote',
    'nav.menu': 'Menu',
    'nav.close': 'Close',
    'menu.foot': 'Castro Creative<br>AI video ads and Meta campaign setup',

    'hero.titleAria': 'Ads that make people feel something.',
    'hero.line1': 'Ads that make',
    'hero.line2': 'people feel',
    'hero.line3': 'something.',
    'hero.lede': '<strong>Castro Creative</strong> is an AI marketing agency. We make video ads, product photos, websites and social posts for brands, then set up the Meta campaigns that put them in front of people.',
    'hero.cta1': 'Request a quote',
    'hero.cta2': 'Watch the films',
    'hero.ring': 'Delivered in 48 hours ✺ Delivered in 48 hours ✺',
    'hero.pack': 'Video · Photo · Web · Social',
    'hero.posterAlt': "Showreel: a dog running along a beach at sunset, from one of the studio's concept films",
    'hero.tag': 'Showreel · concept films',
    'hero.cue': 'Scroll',

    'ribbon.a1': 'AI video ads',
    'ribbon.a2': 'Meta campaign setup',
    'ribbon.a3': '48-hour delivery',
    'ribbon.a4': 'Story first',
    'ribbon.a5': 'Product second',
    'ribbon.b1': 'Consistent characters',
    'ribbon.b2': 'Product close-ups',
    'ribbon.b3': 'Sound design',
    'ribbon.b4': '9:16',
    'ribbon.b5': '1:1',
    'ribbon.b6': '21:9',
    'ribbon.b7': 'One revision included',

    'manifesto.aria': 'What we believe',
    'manifesto.text': 'Nobody remembers a product shot. They remember the old man who opened his door to a stray cat. So we write the story first, cast characters who look the same in every frame, and let your product walk in at the exact moment it matters.',
    'manifesto.sign': 'That is the whole method. The rest of this page is proof.',

    'work.title': 'Five films.<br>Press play.',
    'work.note': 'These are concept films: sample work made for fictional or generic brands, to show what the studio can make for yours.',
    'work.hint': 'Keep scrolling',
    'work.badge': 'Play film',

    'film.1.title': 'Who Adopted Whom',
    'film.1.meta': 'Pet brand · Christmas story · 33 seconds',
    'film.1.playAria': 'Play film: Who Adopted Whom, 33 seconds, with sound',
    'film.1.alt': "A ginger cat watches an old man's hand lay a candy cane on a snowy doormat",
    'film.1.kind': 'Pet brand, Christmas story',
    'film.1.desc': 'A lonely old man and a stray cat, and a question about who rescued whom.',
    'film.1.screenAria': 'Who Adopted Whom, full film with sound',
    'film.1.secs': '33 s',

    'film.2.title': 'Made for Every Walk',
    'film.2.meta': 'Pet gear · Lifestyle spot · 18 seconds',
    'film.2.playAria': 'Play film: Made for Every Walk, 18 seconds, with sound',
    'film.2.alt': 'A white dog in a lilac harness runs through shallow surf at sunset',
    'film.2.kind': 'Pet gear, lifestyle spot',
    'film.2.desc': 'A dog harness, a beach and the golden hour. The short one: all energy, no dialogue.',
    'film.2.screenAria': 'Made for Every Walk, full film with sound',
    'film.2.secs': '18 s',

    'film.3.title': 'Her Other Half',
    'film.3.meta': 'Food & bakery · 60 seconds',
    'film.3.playAria': 'Play film: Her Other Half, 60 seconds, with sound',
    'film.3.alt': 'An elderly man reaches into a tin of cookies held between him and a younger woman',
    'film.3.kind': 'Food and bakery',
    'film.3.desc': 'A quiet visit, a tin of cookies, and the memory it carries.',
    'film.3.screenAria': 'Her Other Half, full film with sound',
    'film.3.secs': '60 s',

    'film.4.title': 'The Key',
    'film.4.meta': 'Florist · Linden & Rose (fictional brand) · 93 seconds',
    'film.4.playAria': 'Play film: The Key, 93 seconds, with sound',
    'film.4.alt': 'A florist in a yellow apron ties a bouquet of peach roses while a man waits at the counter',
    'film.4.kind': 'Florist, for the fictional brand Linden & Rose',
    'film.4.desc': 'A couple, a bouquet, a second chance. The long one, for when the story needs room.',
    'film.4.screenAria': 'The Key, full film with sound',
    'film.4.secs': '93 s',

    'film.5.title': 'The Childhood Cake',
    'film.5.meta': 'Pastry shop · Rosewater & Crumb (fictional brand) · 53 seconds',
    'film.5.playAria': 'Play film: The Childhood Cake, 53 seconds, with sound',
    'film.5.alt': 'Close-up of a white-haired man about to taste a forkful of custard cake',
    'film.5.kind': 'Pastry shop, for the fictional brand Rosewater & Crumb',
    'film.5.desc': 'A grandfather, a granddaughter, and a slice of cake that takes him all the way back.',
    'film.5.screenAria': 'The Childhood Cake, full film with sound',
    'film.5.secs': '53 s',

    'films.title': 'Watch the<br>full films.',
    'films.note': 'Every film, start to finish, with sound. Press play on any of them.',

    'brands.title': 'Product photos,<br>made with AI.',

    'themes.title': 'You pick<br>the theme.<br>We write<br>the story.',
    'themes.lede': 'Give us a theme, a date or just a feeling. We take it from there: the idea, the script, the characters and the twist that makes people watch to the end.',
    'themes.label': 'Start with a theme',
    'themes.chip1': 'Christmas',
    'themes.chip1Prefill': 'Story on the theme: Christmas',
    'themes.chip2': "Mother's Day",
    'themes.chip2Prefill': "Story on the theme: Mother's Day",
    'themes.chip3': "Father's Day",
    'themes.chip3Prefill': "Story on the theme: Father's Day",
    'themes.chip4': "Valentine's Day",
    'themes.chip4Prefill': "Story on the theme: Valentine's Day",
    'themes.chip5': 'Black Friday',
    'themes.chip5Prefill': 'Story on the theme: Black Friday',
    'themes.chip6': 'Product launch',
    'themes.chip6Prefill': 'Story on the theme: Product launch',
    'themes.chip7': 'Back to school',
    'themes.chip7Prefill': 'Story on the theme: Back to school',
    'themes.chip8': 'Anniversary',
    'themes.chip8Prefill': 'Story on the theme: Anniversary',
    'themes.chip9': 'Summer',
    'themes.chip9Prefill': 'Story on the theme: Summer',
    'themes.chip10': 'Your own idea',
    'themes.chip10Prefill': 'Story on the theme: Your own idea',
    'themes.step1': '<b>The hidden desire</b> We look past the obvious reason to buy and find the feeling underneath it: belonging, being remembered, feeling like a child again.',
    'themes.step2': '<b>The script</b> A beginning, a middle and a turn, written shot by shot with the small details that make a scene feel real: a glance, a hand, a pause.',
    'themes.step3': '<b>The storytelling</b> Characters people care about, silence where it matters, and an ending that lands, with your product at the heart of it.',
    'themes.ex1': '<span>Theme</span> Christmas <i aria-hidden="true">→</i> <span>Story</span> A lonely man and a stray cat. Who rescued whom?',
    'themes.ex2': '<span>Theme</span> Grandparents <i aria-hidden="true">→</i> <span>Story</span> A grandfather finds the cake from his childhood, through his granddaughter.',
    'themes.ex3': '<span>Theme</span> Second chances <i aria-hidden="true">→</i> <span>Story</span> A key left on the table, and a man who finally goes back.',
    'themes.cta': 'Send us your theme',
    'themes.ctaPrefill': 'Story on a theme of my choice',

    'services.title': 'Everything your brand needs.<br>Made with AI.',
    'services.s1.tag': '01 · Video',
    'services.s1.title': 'AI video ads',
    'services.s1.lede': 'Cinematic ads built around a story, made for the feed and good enough for a cinema crop.',
    'services.s1.fact1': 'ads per package',
    'services.s1.fact2': 'delivery',
    'services.s1.fact3': 'revision included',
    'services.s1.li1': 'You pick the theme, we write the script and the twist',
    'services.s1.li2': 'Character sheets so faces stay consistent',
    'services.s1.li3': 'Product and brand close-ups, soundtrack and logo card',
    'services.s1.prefill': 'AI video ads',

    'services.s2.tag': '02 · Photo',
    'services.s2.title': 'AI product &amp; brand photos',
    'services.s2.lede': 'Studio-quality product shots, lifestyle scenes and campaign images, without a photoshoot.',
    'services.s2.li1': '<b>Product</b> Clean packshots for your store and marketplaces.',
    'services.s2.li2': '<b>Lifestyle</b> Your product in real scenes, with real-looking people.',
    'services.s2.li3': '<b>Campaign</b> Seasonal and launch visuals in every format you need.',
    'services.s2.prefill': 'AI product and brand photos',

    'services.s3.tag': '03 · Web',
    'services.s3.title': 'Websites &amp; landing pages',
    'services.s3.lede': 'Fast, striking sites that turn visitors into enquiries. You are looking at one.',
    'services.s3.li1': '<b>Design</b> Bold, animated, built around your brand.',
    'services.s3.li2': '<b>Speed</b> Optimised to load fast on any phone.',
    'services.s3.li3': '<b>Leads</b> Quote forms and a private panel to manage every request.',
    'services.s3.prefill': 'Website or landing page',

    'services.s4.tag': '04 · Social &amp; Ads',
    'services.s4.title': 'Social posts &amp; Meta Ads',
    'services.s4.lede': 'Posts, reels and stories for your feed, and the paid campaigns that put them in front of buyers.',
    'services.s4.li1': 'Feed posts, carousels, reels and stories',
    'services.s4.li2': 'Meta campaign structure, audience and pixel',
    'services.s4.li3': 'Creative testing to learn what actually sells',
    'services.s4.prefill': 'Social posts and Meta Ads',

    'process.title': 'From brief<br>to launch.',
    'process.lede': 'Four steps. Your films land 48 hours after the brief is agreed.',
    'process.st1.title': 'Brief',
    'process.st1.desc': 'Tell us the product, who it is for and where the ads will run. A short form or a quick message is enough to get started.',
    'process.st1.clock': '<b>Hour 0</b> The clock starts when the brief is agreed.',
    'process.st2.title': 'Script and characters',
    'process.st2.desc': 'We write a story with a beginning, a middle and a turn. Then we cast it: every character gets a four-view sheet, so they look the same in every shot.',
    'process.st2.clock': '<b>Inside the 48 hours</b> Story before pixels.',
    'process.st3.title': 'Film',
    'process.st3.desc': 'Scenes, product close-ups, soundtrack and sound design, closed with your logo card. You receive three ads, with one revision included.',
    'process.st3.clock': '<b>Hour 48</b> Three films delivered.',
    'process.st4.title': 'Launch',
    'process.st4.desc': 'If you want it, we set the films up in a Meta campaign: structure, audience, pixel and a creative test. Otherwise the files are yours to run.',
    'process.st4.clock': '<b>After delivery</b> Optional Meta campaign setup.',

    'studio.title': 'Behind<br>the scenes.',
    'studio.lede': 'How we keep characters consistent: before a single scene is generated, everyone in the film gets a character sheet with four views. Face close-up, full body front, side profile and back.',
    'studio.p2': 'That sheet is the reference for every shot, which is why Alvaro has the same face at the door and at the table, and why Caramelo keeps his torn ear.',
    'studio.c1': '<b>Story first</b> A script with a turn, written before anything is rendered.',
    'studio.c2': '<b>Consistent characters</b> One four-view sheet per character, human or cat.',
    'studio.c3': '<b>Product close-ups</b> Shots that linger on the product and the brand details.',
    'studio.c4': '<b>Sound design</b> Music and sound built for the cut, not pasted under it.',
    'studio.c5': '<b>Logo card</b> Every film closes on your brand.',
    'studio.who': 'Castro Creative is run by Isaque B. Castro, a paid-traffic specialist based in Portugal, working with brands in the US, the UK and the EU.',
    'studio.sheetsAria': 'Character sheets used in the films',
    'studio.sh1Alt': 'Character sheet for Alvaro: face close-up, full body front, side profile and back of an older man in a dark coat and green scarf',
    'studio.sh1Cap': '<b>Alvaro</b> The Childhood Cake',
    'studio.sh2Alt': 'Character sheet for Ines: four views of a young girl with braids, a yellow raincoat and red boots',
    'studio.sh2Cap': '<b>Ines</b> The Childhood Cake',
    'studio.sh3Alt': 'Character sheet for Lucia: four views of a baker with glasses and a flour-dusted apron',
    'studio.sh3Cap': '<b>Lucia</b> The Childhood Cake',
    'studio.sh4Alt': 'Character sheet for Armando: four views of an old man in a green wool coat and red scarf',
    'studio.sh4Cap': '<b>Armando</b> Who Adopted Whom',
    'studio.sh5Alt': 'Character sheet for Caramelo: four views of a ginger cat with a torn ear',
    'studio.sh5Cap': '<b>Caramelo</b> Who Adopted Whom',
    'studio.logosNote': 'Brand marks designed for the concept films. Both brands are fictional.',
    'studio.logo1Alt': 'Linden & Rose logo, a fictional florist',
    'studio.logo2Alt': 'Rosewater & Crumb logo, a fictional pastry shop',

    'why.title': 'Why it works.',
    'why.1.title': 'Feeling is what people keep.',
    'why.1.desc': 'A feature list asks for attention. A story earns it, and the brand is there when the feeling lands.',
    'why.2.title': 'The characters hold together.',
    'why.2.desc': 'Same face, same coat, same cat in every shot. Nothing breaks the spell halfway through.',
    'why.3.title': 'The product gets its moment.',
    'why.3.desc': 'It enters when the story needs it, in close-up, so it is wanted rather than announced.',
    'why.4.title': 'Made by someone who runs ads.',
    'why.4.desc': 'The films are written by a Meta Ads specialist, with the placement, the format and the test in mind.',

    'faq.title': 'Fair<br>questions.',
    'faq.q1': 'How fast is the turnaround?',
    'faq.a1': 'Video packages are delivered in 48 hours after the brief is agreed. Photos, websites and social posts are quoted with their own timeline based on scope.',
    'faq.q2': 'How many revisions do I get?',
    'faq.a2': 'One revision is included in the package. If you think you will need more, say so in your message and we will scope it in the quote.',
    'faq.q3': 'Which formats can you deliver?',
    'faq.a3': 'The usual ones for paid social and beyond: 9:16 for Reels, Stories and TikTok, 1:1 for the feed, and 21:9 for the cinematic crop you see on this page. Tell us where the ads will run and we will agree the formats in the quote.',
    'faq.q4': 'Who can use the films, and where?',
    'faq.a4': 'Usage is agreed in writing with your quote, before any work starts. Tell us which channels and countries you plan to advertise in, and for how long, so the terms fit what you need.',
    'faq.q5': 'Are the films on this page client work?',
    'faq.a5': 'No. They are concept films made as sample work. Linden & Rose and Rosewater & Crumb are fictional brands created for the films.',
    'faq.q6': 'Do you run the campaign as well?',
    'faq.a6': 'Yes: Meta Ads setup and management is one of our four services — campaign structure, audience, pixel and creative testing on Facebook and Instagram. You can also take the assets and run them yourself.',
    'faq.q7': 'How do I start?',
    'faq.a7': 'Use the form below. Tell us about the brand, the product and where the ads will run, and you will get a quote back. <a href="#contact">Start a project</a>.',

    'contact.title': "Let's make<br>people feel<br>something.",
    'contact.lede': 'Tell us about the brand and the product. You get a quote back, with no obligation.',
    'contact.fact1': 'AI video ads in the package',
    'contact.fact2': 'delivery',
    'contact.fact3': 'revision included',
    'contact.formTitle': 'Start a project',
    'contact.hpLabel': 'Website',
    'contact.nameLabel': 'Your name',
    'contact.nameErr': 'Add your name so we know who to reply to.',
    'contact.emailLabel': 'Email',
    'contact.emailErr': 'Enter an email address like name@brand.com.',
    'contact.waLabel': 'WhatsApp (with country code)',
    'contact.waPlaceholder': '+351 912 345 678',
    'contact.waErr': 'Enter a valid phone number with country code, or leave it blank.',
    'contact.brandLabel': 'Brand or website',
    'contact.msgLabel': 'What do you sell, and where will the ads run?',
    'contact.msgErr': 'Write a line or two about the project.',
    'contact.submit': 'Send request',
    'contact.sending': 'Sending...',
    'contact.sendEmail': 'Send by email',
    'contact.sendWa': 'Send on WhatsApp',
    'contact.copy': 'Copy message',
    'contact.noteInitial': 'Submit your request directly, or use your email app, WhatsApp, or copy the message.',
    'contact.noteInvalid': 'Check the highlighted fields, then try again.',
    'contact.confirmSuccess': "Thanks! Your request is in. We'll reply within 24 hours.",
    'contact.noteAfterSuccess': 'You can also copy or send a copy via email below if you like.',
    'contact.noteSubmitErr': 'Could not save your request right now. Please try email or copy the message below.',
    'contact.noteEmailOpened': 'Your email app should open with the message ready. Press send there.',
    'contact.noteWaOpened': 'WhatsApp opened in a new tab with your message ready. Press send there.',
    'contact.noteCopied': 'Message copied.',
    'contact.noteCopyErr': 'Copy failed. Select the text in the form and copy it by hand.',
    'contact.cooldownWait': 'Please wait {secs} seconds before sending another request.',
    'contact.cooldownLimit': 'You have sent several requests recently. Please try again in a few minutes.',
    'contact.quotePrefix': 'Quote for: ',
    'contact.linkEmail': 'Email',
    'contact.linkWa': 'WhatsApp',
    'contact.linkWaText': 'Message us on WhatsApp',
    'contact.linkIg': 'Instagram',

    'msg.greeting': 'Hi Castro Creative,',
    'msg.name': 'Name',
    'msg.email': 'Email',
    'msg.whatsapp': 'WhatsApp',
    'msg.brand': 'Brand / website',
    'msg.interest': 'Interested in',
    'msg.footer': 'Sent from the Castro Creative website',
    'msg.subject': 'New project enquiry',

    'footer.legal': '© 2026 Castro Creative. AI video ads and Meta campaign setup, made in Portugal.',
    'footer.top': 'Back to top',

    'player.defaultTitle': 'Film',
    'player.close': 'Close <kbd aria-hidden="true">Esc</kbd>',
    'player.note': 'Concept film with sound. Space plays and pauses.',
    'player.conceptSuffix': ' · Concept film',
  },

  pt: {
    'seo.title': 'Castro Creative — Agência de marketing com IA: anúncios em vídeo, fotos de produto, sites e posts',
    'seo.description': 'A Castro Creative é uma agência de marketing com IA. Produzimos anúncios em vídeo cinematográficos, fotos de produto e marca, sites e posts para redes sociais, e configuramos as campanhas no Meta que levam tudo até as pessoas.',
    'seo.ogTitle': 'Castro Creative — Marketing com IA que faz as pessoas sentirem algo',
    'seo.ogDescription': 'Anúncios em vídeo cinematográficos com IA para marcas, com configuração de campanhas no Meta. Três anúncios por pacote, entregues em 48 horas.',

    'skip': 'Ir para o conteúdo',
    'preloader.line': 'Carregando as emoções',
    'cursor.play': 'Ver',
    'lang.aria': 'Idioma',

    'nav.topAria': 'Castro Creative — voltar ao topo',
    'nav.primaryAria': 'Navegação principal',
    'nav.mobileAria': 'Menu móvel',
    'nav.footerAria': 'Rodapé',
    'nav.work': 'Trabalhos',
    'nav.films': 'Filmes',
    'nav.brands': 'Marcas',
    'nav.themes': 'Seu tema',
    'nav.services': 'Serviços',
    'nav.process': 'Processo',
    'nav.about': 'Sobre',
    'nav.contact': 'Contato',
    'nav.cta': 'Pedir orçamento',
    'nav.menu': 'Menu',
    'nav.close': 'Fechar',
    'menu.foot': 'Castro Creative<br>Anúncios em vídeo com IA e campanhas no Meta',

    'hero.titleAria': 'Anúncios que fazem você sentir algo.',
    'hero.line1': 'Anúncios que',
    'hero.line2': 'fazem você',
    'hero.line3': 'sentir algo.',
    'hero.lede': 'A <strong>Castro Creative</strong> é uma agência de marketing com IA. Criamos anúncios em vídeo, fotos de produto, sites e posts para marcas, e configuramos as campanhas no Meta que levam tudo até as pessoas.',
    'hero.cta1': 'Pedir orçamento',
    'hero.cta2': 'Ver os filmes',
    'hero.ring': 'Entrega em 48 horas ✺ Entrega em 48 horas ✺',
    'hero.pack': 'Vídeo · Foto · Web · Social',
    'hero.posterAlt': 'Showreel: um cachorro correndo pela praia ao pôr do sol, cena de um dos filmes conceituais do estúdio',
    'hero.tag': 'Showreel · filmes conceituais',
    'hero.cue': 'Role',

    'ribbon.a1': 'Anúncios em vídeo com IA',
    'ribbon.a2': 'Campanhas no Meta',
    'ribbon.a3': 'Entrega em 48 horas',
    'ribbon.a4': 'História primeiro',
    'ribbon.a5': 'Produto depois',
    'ribbon.b1': 'Personagens consistentes',
    'ribbon.b2': 'Close-ups de produto',
    'ribbon.b3': 'Design de som',
    'ribbon.b4': '9:16',
    'ribbon.b5': '1:1',
    'ribbon.b6': '21:9',
    'ribbon.b7': 'Uma revisão incluída',

    'manifesto.aria': 'O que acreditamos',
    'manifesto.text': 'Ninguém se lembra de uma foto isolada de produto. As pessoas se lembram do senhor que abriu a porta para um gato de rua. Por isso escrevemos a história primeiro, criamos personagens que mantêm o mesmo rosto em cada cena e fazemos o seu produto entrar no exato momento em que ele importa.',
    'manifesto.sign': 'Esse é todo o método. O resto desta página é a prova.',

    'work.title': 'Cinco filmes.<br>Dê o play.',
    'work.note': 'Estes são filmes conceituais: trabalhos de demonstração feitos para marcas fictícias ou genéricas, para mostrar o que podemos criar para a sua.',
    'work.hint': 'Continue rolando',
    'work.badge': 'Ver filme',

    'film.1.title': 'Quem Adotou Quem',
    'film.1.meta': 'Marca pet · História de Natal · 33 segundos',
    'film.1.playAria': 'Assistir filme: Quem Adotou Quem, 33 segundos, com som',
    'film.1.alt': 'Um gato ruivo observa a mão de um senhor deixar uma bengala doce no capacho coberto de neve',
    'film.1.kind': 'Marca pet, história de Natal',
    'film.1.desc': 'Um senhor solitário, um gato de rua e a pergunta de quem salvou quem.',
    'film.1.screenAria': 'Quem Adotou Quem, filme completo com som',
    'film.1.secs': '33 s',

    'film.2.title': 'Feito Para Todo Passeio',
    'film.2.meta': 'Acessórios pet · Filme lifestyle · 18 segundos',
    'film.2.playAria': 'Assistir filme: Feito Para Todo Passeio, 18 segundos, com som',
    'film.2.alt': 'Um cachorro branco de peitoral lilás corre pela beira do mar ao pôr do sol',
    'film.2.kind': 'Acessórios pet, filme lifestyle',
    'film.2.desc': 'Um peitoral, uma praia e a golden hour. O filme curto: pura energia, zero diálogo.',
    'film.2.screenAria': 'Feito Para Todo Passeio, filme completo com som',
    'film.2.secs': '18 s',

    'film.3.title': 'A Outra Metade Dela',
    'film.3.meta': 'Alimentação e confeitaria · 60 segundos',
    'film.3.playAria': 'Assistir filme: A Outra Metade Dela, 60 segundos, com som',
    'film.3.alt': 'Um senhor pega um biscoito de uma lata segurada entre ele e uma mulher mais jovem',
    'film.3.kind': 'Alimentação e confeitaria',
    'film.3.desc': 'Uma visita silenciosa, uma lata de biscoitos e a lembrança que ela guarda.',
    'film.3.screenAria': 'A Outra Metade Dela, filme completo com som',
    'film.3.secs': '60 s',

    'film.4.title': 'A Chave',
    'film.4.meta': 'Floricultura · Linden & Rose (marca fictícia) · 93 segundos',
    'film.4.playAria': 'Assistir filme: A Chave, 93 segundos, com som',
    'film.4.alt': 'Uma florista de avental amarelo amarra um buquê de rosas pêssego enquanto um homem espera no balcão',
    'film.4.kind': 'Floricultura, para a marca fictícia Linden & Rose',
    'film.4.desc': 'Um casal, um buquê, uma segunda chance. O filme longo, para quando a história pede respiro.',
    'film.4.screenAria': 'A Chave, filme completo com som',
    'film.4.secs': '93 s',

    'film.5.title': 'O Bolo da Infância',
    'film.5.meta': 'Confeitaria · Rosewater & Crumb (marca fictícia) · 53 segundos',
    'film.5.playAria': 'Assistir filme: O Bolo da Infância, 53 segundos, com som',
    'film.5.alt': 'Close de um senhor de cabelos brancos prestes a provar uma garfada de bolo com creme',
    'film.5.kind': 'Confeitaria, para a marca fictícia Rosewater & Crumb',
    'film.5.desc': 'Um avô, uma neta e uma fatia de bolo que o leva de volta no tempo.',
    'film.5.screenAria': 'O Bolo da Infância, filme completo com som',
    'film.5.secs': '53 s',

    'films.title': 'Assista aos<br>filmes completos.',
    'films.note': 'Cada filme, do começo ao fim, com som. Dê o play em qualquer um.',

    'brands.title': 'Fotos de produto,<br>feitas com IA.',

    'themes.title': 'Você escolhe<br>o tema.<br>Nós criamos<br>a história.',
    'themes.lede': 'Traga um tema, uma data ou apenas uma sensação. A gente assume daqui: a ideia, o roteiro, os personagens e a virada que faz o público assistir até o final.',
    'themes.label': 'Comece por um tema',
    'themes.chip1': 'Natal',
    'themes.chip1Prefill': 'História com o tema: Natal',
    'themes.chip2': 'Dia das Mães',
    'themes.chip2Prefill': 'História com o tema: Dia das Mães',
    'themes.chip3': 'Dia dos Pais',
    'themes.chip3Prefill': 'História com o tema: Dia dos Pais',
    'themes.chip4': 'Dia dos Namorados',
    'themes.chip4Prefill': 'História com o tema: Dia dos Namorados',
    'themes.chip5': 'Black Friday',
    'themes.chip5Prefill': 'História com o tema: Black Friday',
    'themes.chip6': 'Lançamento de produto',
    'themes.chip6Prefill': 'História com o tema: Lançamento de produto',
    'themes.chip7': 'Volta às aulas',
    'themes.chip7Prefill': 'História com o tema: Volta às aulas',
    'themes.chip8': 'Aniversário',
    'themes.chip8Prefill': 'História com o tema: Aniversário',
    'themes.chip9': 'Verão',
    'themes.chip9Prefill': 'História com o tema: Verão',
    'themes.chip10': 'Sua própria ideia',
    'themes.chip10Prefill': 'História com o tema: Sua própria ideia',
    'themes.step1': '<b>O desejo oculto</b> Olhamos além do motivo óbvio de compra para encontrar o sentimento por trás dele: pertencer, ser lembrado, sentir-se criança outra vez.',
    'themes.step2': '<b>O roteiro</b> Começo, meio e virada, escritos plano a plano com os pequenos detalhes que tornam uma cena real: um olhar, um gesto, uma pausa.',
    'themes.step3': '<b>O storytelling</b> Personagens com quem o público se importa, silêncio onde importa e um final que marca, com o seu produto no centro de tudo.',
    'themes.ex1': '<span>Tema</span> Natal <i aria-hidden="true">→</i> <span>História</span> Um homem solitário e um gato de rua. Quem salvou quem?',
    'themes.ex2': '<span>Tema</span> Avós <i aria-hidden="true">→</i> <span>História</span> Um avô reencontra o bolo da sua infância através da neta.',
    'themes.ex3': '<span>Tema</span> Recomeços <i aria-hidden="true">→</i> <span>História</span> Uma chave deixada sobre a mesa e um homem que finalmente volta.',
    'themes.cta': 'Envie o seu tema',
    'themes.ctaPrefill': 'História com tema à minha escolha',

    'services.title': 'Tudo o que sua marca precisa.<br>Feito com IA.',
    'services.s1.tag': '01 · Vídeo',
    'services.s1.title': 'Anúncios em vídeo com IA',
    'services.s1.lede': 'Anúncios cinematográficos construídos em torno de uma história, feitos para o feed e com qualidade de tela grande.',
    'services.s1.fact1': 'anúncios no pacote',
    'services.s1.fact2': 'entrega',
    'services.s1.fact3': 'revisão incluída',
    'services.s1.li1': 'Você escolhe o tema, nós escrevemos o roteiro e a virada',
    'services.s1.li2': 'Fichas de personagem para manter os rostos sempre consistentes',
    'services.s1.li3': 'Close-ups do produto e da marca, trilha sonora e tela final com logo',
    'services.s1.prefill': 'Anúncios em vídeo com IA',

    'services.s2.tag': '02 · Foto',
    'services.s2.title': 'Fotos de produto e marca com IA',
    'services.s2.lede': 'Fotos de produto em qualidade de estúdio, cenas lifestyle e imagens de campanha, sem precisar de ensaio fotográfico.',
    'services.s2.li1': '<b>Produto</b> Packshots limpos para sua loja e marketplaces.',
    'services.s2.li2': '<b>Lifestyle</b> Seu produto em cenas reais, com pessoas naturais.',
    'services.s2.li3': '<b>Campanha</b> Visuais sazonais e de lançamento em todos os formatos.',
    'services.s2.prefill': 'Fotos de produto e marca com IA',

    'services.s3.tag': '03 · Web',
    'services.s3.title': 'Sites e landing pages',
    'services.s3.lede': 'Sites rápidos e marcantes que transformam visitantes em pedidos de orçamento. Você está navegando em um deles.',
    'services.s3.li1': '<b>Design</b> Ousado, animado e construído em torno da sua marca.',
    'services.s3.li2': '<b>Velocidade</b> Otimizado para carregar rápido em qualquer celular.',
    'services.s3.li3': '<b>Leads</b> Formulários de orçamento e painel privado para gerenciar cada pedido.',
    'services.s3.prefill': 'Site ou landing page',

    'services.s4.tag': '04 · Social &amp; Ads',
    'services.s4.title': 'Posts sociais e Meta Ads',
    'services.s4.lede': 'Posts, reels e stories para o seu feed, e as campanhas pagas que colocam tudo na frente de quem compra.',
    'services.s4.li1': 'Posts de feed, carrosséis, reels e stories',
    'services.s4.li2': 'Estrutura de campanha no Meta, público e pixel',
    'services.s4.li3': 'Testes de criativos para descobrir o que realmente vende',
    'services.s4.prefill': 'Posts sociais e Meta Ads',

    'process.title': 'Do briefing<br>ao lançamento.',
    'process.lede': 'Quatro etapas. Seus filmes ficam prontos 48 horas após a aprovação do briefing.',
    'process.st1.title': 'Briefing',
    'process.st1.desc': 'Conte qual é o produto, para quem ele é e onde os anúncios vão rodar. Um formulário rápido ou uma mensagem curta já bastam para começar.',
    'process.st1.clock': '<b>Hora 0</b> O relógio começa a contar quando o briefing é aprovado.',
    'process.st2.title': 'Roteiro e personagens',
    'process.st2.desc': 'Escrevemos uma história com começo, meio e virada. Depois escalamos o elenco: cada personagem recebe uma ficha com quatro ângulos para parecer o mesmo em cada cena.',
    'process.st2.clock': '<b>Dentro das 48 horas</b> História antes dos pixels.',
    'process.st3.title': 'Filme',
    'process.st3.desc': 'Cenas, close-ups do produto, trilha e design de som, fechando com o cartão do seu logo. Você recebe três anúncios, com uma revisão incluída.',
    'process.st3.clock': '<b>Hora 48</b> Três filmes entregues.',
    'process.st4.title': 'Lançamento',
    'process.st4.desc': 'Se quiser, subimos os filmes em uma campanha no Meta: estrutura, públicos, pixel e teste criativo. Caso contrário, os arquivos são seus para rodar.',
    'process.st4.clock': '<b>Após a entrega</b> Configuração opcional no Meta.',

    'studio.title': 'Nos<br>bastidores.',
    'studio.lede': 'Como mantemos os personagens consistentes: antes de gerar uma única cena, cada pessoa ou animal do filme recebe uma ficha com quatro vistas. Close do rosto, corpo inteiro de frente, perfil lateral e costas.',
    'studio.p2': 'Essa ficha serve de referência para cada plano — é por isso que o Alvaro tem o mesmo rosto na porta e na mesa, e o Caramelo mantém a orelha rasgada.',
    'studio.c1': '<b>História primeiro</b> Um roteiro com virada, escrito antes de renderizar qualquer cena.',
    'studio.c2': '<b>Personagens consistentes</b> Uma ficha de quatro ângulos por personagem, humano ou gato.',
    'studio.c3': '<b>Close-ups de produto</b> Planos que valorizam o produto e os detalhes da marca.',
    'studio.c4': '<b>Design de som</b> Música e áudio criados para a montagem, não apenas colados por baixo.',
    'studio.c5': '<b>Cartão de marca</b> Todo filme termina com a sua assinatura visual.',
    'studio.who': 'A Castro Creative é conduzida por Isaque B. Castro, especialista em tráfego pago baseado em Portugal, trabalhando com marcas nos EUA, Reino Unido e União Europeia.',
    'studio.sheetsAria': 'Fichas de personagem usadas nos filmes',
    'studio.sh1Alt': 'Ficha de personagem do Alvaro: close do rosto, corpo inteiro de frente, perfil lateral e costas de um senhor de casaco escuro e cachecol verde',
    'studio.sh1Cap': '<b>Alvaro</b> O Bolo da Infância',
    'studio.sh2Alt': 'Ficha de personagem da Ines: quatro ângulos de uma menina de tranças, capa de chuva amarela e botas vermelhas',
    'studio.sh2Cap': '<b>Ines</b> O Bolo da Infância',
    'studio.sh3Alt': 'Ficha de personagem da Lucia: quatro ângulos de uma confeiteira de óculos e avental sujo de farinha',
    'studio.sh3Cap': '<b>Lucia</b> O Bolo da Infância',
    'studio.sh4Alt': 'Ficha de personagem do Armando: quatro ângulos de um senhor de casaco de lã verde e cachecol vermelho',
    'studio.sh4Cap': '<b>Armando</b> Quem Adotou Quem',
    'studio.sh5Alt': 'Ficha de personagem do Caramelo: quatro ângulos de um gato ruivo com uma orelha rasgada',
    'studio.sh5Cap': '<b>Caramelo</b> Quem Adotou Quem',
    'studio.logosNote': 'Identidades visuais criadas para os filmes conceituais. Ambas as marcas são fictícias.',
    'studio.logo1Alt': 'Logo da Linden & Rose, uma floricultura fictícia',
    'studio.logo2Alt': 'Logo da Rosewater & Crumb, uma confeitaria fictícia',

    'why.title': 'Por que funciona.',
    'why.1.title': 'Emoção é o que fica na memória.',
    'why.1.desc': 'Uma lista de recursos pede atenção. Uma história conquista atenção — e a marca está lá quando a emoção bate.',
    'why.2.title': 'Os personagens se sustentam.',
    'why.2.desc': 'Mesmo rosto, mesmo casaco, mesmo gato em cada corte. Nada quebra o encanto no meio do caminho.',
    'why.3.title': 'O produto tem o seu momento.',
    'why.3.desc': 'Ele entra quando a história pede, em close-up, para ser desejado em vez de apenas anunciado.',
    'why.4.title': 'Feito por quem roda anúncios.',
    'why.4.desc': 'Os filmes são escritos por um especialista em Meta Ads, já pensando no posicionamento, no formato e no teste.',

    'faq.title': 'Perguntas<br>frequentes.',
    'faq.q1': 'Qual é o prazo de entrega?',
    'faq.a1': 'Os pacotes de vídeo são entregues em 48 horas após a aprovação do briefing. Fotos, sites e posts sociais recebem um cronograma próprio conforme o escopo.',
    'faq.q2': 'Quantas revisões estão incluídas?',
    'faq.a2': 'Uma revisão já está incluída no pacote. Se achar que vai precisar de mais rodadas, avise na mensagem que incluímos no orçamento.',
    'faq.q3': 'Quais formatos vocês entregam?',
    'faq.a3': 'Os padrões para mídia paga e além: 9:16 para Reels, Stories e TikTok, 1:1 para o feed e 21:9 no corte cinematográfico que você vê nesta página. Diga onde os anúncios vão rodar e definimos os formatos no orçamento.',
    'faq.q4': 'Quem pode usar os filmes e onde?',
    'faq.a4': 'Os direitos de uso são combinados por escrito no orçamento antes do início do trabalho. Informe em quais canais e países pretende anunciar e por quanto tempo.',
    'faq.q5': 'Os filmes desta página são de clientes reais?',
    'faq.a5': 'Não. São filmes conceituais produzidos como portfólio de demonstração. Linden & Rose e Rosewater & Crumb são marcas fictícias criadas para esses filmes.',
    'faq.q6': 'Vocês também gerenciam a campanha?',
    'faq.a6': 'Sim: a configuração e gestão de Meta Ads é um dos nossos quatro serviços — estrutura de campanha, públicos, pixel e testes de criativos no Facebook e Instagram. Se preferir, você também pode pegar os arquivos e rodar por conta própria.',
    'faq.q7': 'Como faço para começar?',
    'faq.a7': 'Use o formulário abaixo. Conte sobre a marca, o produto e onde os anúncios vão rodar, e enviaremos o seu orçamento. <a href="#contact">Iniciar um projeto</a>.',

    'contact.title': 'Vamos fazer<br>as pessoas<br>sentirem algo.',
    'contact.lede': 'Conte sobre a marca e o produto. Você recebe um orçamento sem compromisso.',
    'contact.fact1': 'anúncios em vídeo com IA no pacote',
    'contact.fact2': 'entrega',
    'contact.fact3': 'revisão incluída',
    'contact.formTitle': 'Iniciar um projeto',
    'contact.hpLabel': 'Site',
    'contact.nameLabel': 'Seu nome',
    'contact.nameErr': 'Informe seu nome para sabermos a quem responder.',
    'contact.emailLabel': 'E-mail',
    'contact.emailErr': 'Digite um endereço de e-mail válido, como nome@marca.com.',
    'contact.waLabel': 'WhatsApp (com código do país)',
    'contact.waPlaceholder': '+55 11 91234-5678',
    'contact.waErr': 'Informe um telefone válido com DDI, ou deixe em branco.',
    'contact.brandLabel': 'Marca ou site',
    'contact.msgLabel': 'O que você vende e onde os anúncios vão rodar?',
    'contact.msgErr': 'Escreva uma ou duas linhas sobre o projeto.',
    'contact.submit': 'Enviar pedido',
    'contact.sending': 'Enviando...',
    'contact.sendEmail': 'Enviar por e-mail',
    'contact.sendWa': 'Enviar no WhatsApp',
    'contact.copy': 'Copiar mensagem',
    'contact.noteInitial': 'Envie seu pedido diretamente, ou use seu aplicativo de e-mail, WhatsApp ou copie a mensagem.',
    'contact.noteInvalid': 'Verifique os campos destacados e tente novamente.',
    'contact.confirmSuccess': 'Obrigado! Seu pedido foi enviado. Responderemos em até 24 horas.',
    'contact.noteAfterSuccess': 'Se preferir, você também pode copiar ou enviar uma cópia por e-mail abaixo.',
    'contact.noteSubmitErr': 'Não foi possível salvar seu pedido agora. Tente enviar por e-mail ou copie a mensagem abaixo.',
    'contact.noteEmailOpened': 'Seu aplicativo de e-mail deve abrir com a mensagem pronta. Basta enviar por lá.',
    'contact.noteWaOpened': 'O WhatsApp foi aberto em outra aba com sua mensagem pronta. É só enviar por lá.',
    'contact.noteCopied': 'Mensagem copiada.',
    'contact.noteCopyErr': 'Falha ao copiar. Selecione o texto no formulário e copie manualmente.',
    'contact.cooldownWait': 'Aguarde {secs} segundos antes de enviar outro pedido.',
    'contact.cooldownLimit': 'Você enviou vários pedidos recentemente. Tente novamente em alguns minutos.',
    'contact.quotePrefix': 'Orçamento para: ',
    'contact.linkEmail': 'E-mail',
    'contact.linkWa': 'WhatsApp',
    'contact.linkWaText': 'Fale conosco no WhatsApp',
    'contact.linkIg': 'Instagram',

    'msg.greeting': 'Olá, Castro Creative,',
    'msg.name': 'Nome',
    'msg.email': 'E-mail',
    'msg.whatsapp': 'WhatsApp',
    'msg.brand': 'Marca / site',
    'msg.interest': 'Interesse em',
    'msg.footer': 'Enviado pelo site da Castro Creative',
    'msg.subject': 'Novo pedido de orçamento',

    'footer.legal': '© 2026 Castro Creative. Anúncios em vídeo com IA e campanhas no Meta, feito em Portugal.',
    'footer.top': 'Voltar ao topo',

    'player.defaultTitle': 'Filme',
    'player.close': 'Fechar <kbd aria-hidden="true">Esc</kbd>',
    'player.note': 'Filme conceitual com som. Espaço reproduz e pausa.',
    'player.conceptSuffix': ' · Filme conceitual',
  },

  es: {
    'seo.title': 'Castro Creative — Agencia de marketing con IA: anuncios en video, fotos de producto, sitios web y posts',
    'seo.description': 'Castro Creative es una agencia de marketing con IA. Creamos anuncios en video cinematográficos, fotos de producto y marca, sitios web y posts para redes sociales, y configuramos las campañas en Meta que los ponen frente a la gente.',
    'seo.ogTitle': 'Castro Creative — Marketing con IA que hace sentir algo',
    'seo.ogDescription': 'Anuncios en video cinematográficos con IA para marcas, más configuración de campañas en Meta. Tres anuncios por paquete, entregados en 48 horas.',

    'skip': 'Ir al contenido',
    'preloader.line': 'Cargando las emociones',
    'cursor.play': 'Ver',
    'lang.aria': 'Idioma',

    'nav.topAria': 'Castro Creative — volver arriba',
    'nav.primaryAria': 'Navegación principal',
    'nav.mobileAria': 'Menú móvil',
    'nav.footerAria': 'Pie de página',
    'nav.work': 'Trabajos',
    'nav.films': 'Películas',
    'nav.brands': 'Marcas',
    'nav.themes': 'Tu tema',
    'nav.services': 'Servicios',
    'nav.process': 'Proceso',
    'nav.about': 'Nosotros',
    'nav.contact': 'Contacto',
    'nav.cta': 'Pedir presupuesto',
    'nav.menu': 'Menú',
    'nav.close': 'Cerrar',
    'menu.foot': 'Castro Creative<br>Anuncios en video con IA y campañas en Meta',

    'hero.titleAria': 'Anuncios que te hacen sentir algo.',
    'hero.line1': 'Anuncios que',
    'hero.line2': 'te hacen',
    'hero.line3': 'sentir algo.',
    'hero.lede': '<strong>Castro Creative</strong> es una agencia de marketing con IA. Creamos anuncios en video, fotos de producto, sitios web y posts para marcas, y configuramos las campañas en Meta que los ponen frente a la gente.',
    'hero.cta1': 'Pedir presupuesto',
    'hero.cta2': 'Ver las películas',
    'hero.ring': 'Entrega en 48 horas ✺ Entrega en 48 horas ✺',
    'hero.pack': 'Video · Foto · Web · Social',
    'hero.posterAlt': 'Showreel: un perro corriendo por la playa al atardecer, escena de uno de los films conceptuales del estudio',
    'hero.tag': 'Showreel · films conceptuales',
    'hero.cue': 'Desliza',

    'ribbon.a1': 'Anuncios en video con IA',
    'ribbon.a2': 'Campañas en Meta',
    'ribbon.a3': 'Entrega en 48 horas',
    'ribbon.a4': 'Historia primero',
    'ribbon.a5': 'Producto después',
    'ribbon.b1': 'Personajes consistentes',
    'ribbon.b2': 'Primeros planos de producto',
    'ribbon.b3': 'Diseño sonoro',
    'ribbon.b4': '9:16',
    'ribbon.b5': '1:1',
    'ribbon.b6': '21:9',
    'ribbon.b7': 'Una revisión incluida',

    'manifesto.aria': 'En lo que creemos',
    'manifesto.text': 'Nadie recuerda una simple foto de producto. La gente recuerda al anciano que le abrió la puerta a un gato callejero. Por eso escribimos primero la historia, creamos personajes que lucen igual en cada toma y dejamos que tu producto entre en escena justo cuando más importa.',
    'manifesto.sign': 'Ese es todo el método. El resto de esta página es la prueba.',

    'work.title': 'Cinco películas.<br>Dale play.',
    'work.note': 'Estos son films conceptuales: piezas de muestra creadas para marcas ficticias o genéricas, para mostrar lo que podemos hacer por la tuya.',
    'work.hint': 'Sigue deslizando',
    'work.badge': 'Ver película',

    'film.1.title': '¿Quién Adoptó a Quién?',
    'film.1.meta': 'Marca de mascotas · Historia de Navidad · 33 segundos',
    'film.1.playAria': 'Reproducir película: ¿Quién Adoptó a Quién?, 33 segundos, con sonido',
    'film.1.alt': 'Un gato naranja observa la mano de un anciano dejar un bastón de caramelo sobre el felpudo nevado',
    'film.1.kind': 'Marca de mascotas, historia de Navidad',
    'film.1.desc': 'Un anciano solitario, un gato callejero y la pregunta de quién rescató a quién.',
    'film.1.screenAria': '¿Quién Adoptó a Quién?, película completa con sonido',
    'film.1.secs': '33 s',

    'film.2.title': 'Hecho Para Cada Paseo',
    'film.2.meta': 'Accesorios para mascotas · Spot lifestyle · 18 segundos',
    'film.2.playAria': 'Reproducir película: Hecho Para Cada Paseo, 18 segundos, con sonido',
    'film.2.alt': 'Un perro blanco con arnés lila corre por la orilla del mar al atardecer',
    'film.2.kind': 'Accesorios para mascotas, spot lifestyle',
    'film.2.desc': 'Un arnés, una playa y la hora dorada. El corto: pura energía, sin diálogos.',
    'film.2.screenAria': 'Hecho Para Cada Paseo, película completa con sonido',
    'film.2.secs': '18 s',

    'film.3.title': 'Su Otra Mitad',
    'film.3.meta': 'Alimentación y pastelería · 60 segundos',
    'film.3.playAria': 'Reproducir película: Su Otra Mitad, 60 segundos, con sonido',
    'film.3.alt': 'Un hombre mayor toma una galleta de una lata sostenida entre él y una mujer joven',
    'film.3.kind': 'Alimentación y pastelería',
    'film.3.desc': 'Una visita tranquila, una lata de galletas y el recuerdo que guarda.',
    'film.3.screenAria': 'Su Otra Mitad, película completa con sonido',
    'film.3.secs': '60 s',

    'film.4.title': 'La Llave',
    'film.4.meta': 'Florería · Linden & Rose (marca ficticia) · 93 segundos',
    'film.4.playAria': 'Reproducir película: La Llave, 93 segundos, con sonido',
    'film.4.alt': 'Una florista con delantal amarillo ata un ramo de rosas durazno mientras un hombre espera en el mostrador',
    'film.4.kind': 'Florería, para la marca ficticia Linden & Rose',
    'film.4.desc': 'Una pareja, un ramo, una segunda oportunidad. El largo, para cuando la historia pide espacio.',
    'film.4.screenAria': 'La Llave, película completa con sonido',
    'film.4.secs': '93 s',

    'film.5.title': 'El Pastel de la Infancia',
    'film.5.meta': 'Pastelería · Rosewater & Crumb (marca ficticia) · 53 segundos',
    'film.5.playAria': 'Reproducir película: El Pastel de la Infancia, 53 segundos, con sonido',
    'film.5.alt': 'Primer plano de un hombre de pelo blanco a punto de probar un bocado de pastel con crema',
    'film.5.kind': 'Pastelería, para la marca ficticia Rosewater & Crumb',
    'film.5.desc': 'Un abuelo, una nieta y una porción de pastel que lo lleva de vuelta en el tiempo.',
    'film.5.screenAria': 'El Pastel de la Infancia, película completa con sonido',
    'film.5.secs': '53 s',

    'films.title': 'Mira las<br>películas completas.',
    'films.note': 'Cada película, de principio a fin, con sonido. Dale play a cualquiera.',

    'brands.title': 'Fotos de producto,<br>hechas con IA.',

    'themes.title': 'Tú eliges<br>el tema.<br>Nosotros creamos<br>la historia.',
    'themes.lede': 'Danos un tema, una fecha o solo una sensación. Nosotros nos encargamos del resto: la idea, el guion, los personajes y el giro que hace que la gente vea hasta el final.',
    'themes.label': 'Empieza con un tema',
    'themes.chip1': 'Navidad',
    'themes.chip1Prefill': 'Historia sobre el tema: Navidad',
    'themes.chip2': 'Día de la Madre',
    'themes.chip2Prefill': 'Historia sobre el tema: Día de la Madre',
    'themes.chip3': 'Día del Padre',
    'themes.chip3Prefill': 'Historia sobre el tema: Día del Padre',
    'themes.chip4': 'San Valentín',
    'themes.chip4Prefill': 'Historia sobre el tema: San Valentín',
    'themes.chip5': 'Black Friday',
    'themes.chip5Prefill': 'Historia sobre el tema: Black Friday',
    'themes.chip6': 'Lanzamiento de producto',
    'themes.chip6Prefill': 'Historia sobre el tema: Lanzamiento de producto',
    'themes.chip7': 'Vuelta a clases',
    'themes.chip7Prefill': 'Historia sobre el tema: Vuelta a clases',
    'themes.chip8': 'Aniversario',
    'themes.chip8Prefill': 'Historia sobre el tema: Aniversario',
    'themes.chip9': 'Verano',
    'themes.chip9Prefill': 'Historia sobre el tema: Verano',
    'themes.chip10': 'Tu propia idea',
    'themes.chip10Prefill': 'Historia sobre el tema: Tu propia idea',
    'themes.step1': '<b>El deseo oculto</b> Miramos más allá del motivo obvio de compra para encontrar la emoción que hay debajo: pertenecer, ser recordado, volver a sentirse niño.',
    'themes.step2': '<b>El guion</b> Principio, desarrollo y giro, escritos toma por toma con esos pequeños detalles que hacen real una escena: una mirada, una mano, una pausa.',
    'themes.step3': '<b>El storytelling</b> Personajes que importan, silencio donde hace falta y un final que llega, con tu producto en el corazón de la historia.',
    'themes.ex1': '<span>Tema</span> Navidad <i aria-hidden="true">→</i> <span>Historia</span> Un hombre solitario y un gato callejero. ¿Quién rescató a quién?',
    'themes.ex2': '<span>Tema</span> Abuelos <i aria-hidden="true">→</i> <span>Historia</span> Un abuelo reencuentra el pastel de su infancia a través de su nieta.',
    'themes.ex3': '<span>Tema</span> Segundas oportunidades <i aria-hidden="true">→</i> <span>Historia</span> Una llave olvidada sobre la mesa y un hombre que por fin regresa.',
    'themes.cta': 'Envíanos tu tema',
    'themes.ctaPrefill': 'Historia sobre un tema a mi elección',

    'services.title': 'Todo lo que tu marca necesita.<br>Hecho con IA.',
    'services.s1.tag': '01 · Video',
    'services.s1.title': 'Anuncios en video con IA',
    'services.s1.lede': 'Anuncios cinematográficos construidos en torno a una historia, pensados para el feed y listos para formato cine.',
    'services.s1.fact1': 'anuncios por paquete',
    'services.s1.fact2': 'entrega',
    'services.s1.fact3': 'revisión incluida',
    'services.s1.li1': 'Tú eliges el tema, nosotros escribimos el guion y el giro',
    'services.s1.li2': 'Hojas de personaje para que los rostros siempre coincidan',
    'services.s1.li3': 'Primeros planos del producto y marca, banda sonora y cierre con logo',
    'services.s1.prefill': 'Anuncios en video con IA',

    'services.s2.tag': '02 · Foto',
    'services.s2.title': 'Fotos de producto y marca con IA',
    'services.s2.lede': 'Tomas de producto con calidad de estudio, escenas lifestyle e imágenes de campaña sin sesión fotográfica.',
    'services.s2.li1': '<b>Producto</b> Packshots limpios para tu tienda y marketplaces.',
    'services.s2.li2': '<b>Lifestyle</b> Tu producto en escenas reales, con personas naturales.',
    'services.s2.li3': '<b>Campaña</b> Visuales de temporada y lanzamiento en cada formato que necesites.',
    'services.s2.prefill': 'Fotos de producto y marca con IA',

    'services.s3.tag': '03 · Web',
    'services.s3.title': 'Sitios web y landing pages',
    'services.s3.lede': 'Sitios rápidos y memorables que convierten visitas en solicitudes reales. Estás navegando en uno.',
    'services.s3.li1': '<b>Diseño</b> Audaz, animado y hecho a medida para tu marca.',
    'services.s3.li2': '<b>Velocidad</b> Optimizado para cargar rápido en cualquier teléfono.',
    'services.s3.li3': '<b>Leads</b> Formularios de presupuesto y panel privado para gestionar cada solicitud.',
    'services.s3.prefill': 'Sitio web o landing page',

    'services.s4.tag': '04 · Social &amp; Ads',
    'services.s4.title': 'Posts sociales y Meta Ads',
    'services.s4.lede': 'Posts, reels e historias para tu feed, junto con las campañas pagas que los llevan frente a compradores.',
    'services.s4.li1': 'Posts de feed, carruseles, reels e historias',
    'services.s4.li2': 'Estructura de campaña en Meta, audiencias y píxel',
    'services.s4.li3': 'Pruebas creativas para descubrir qué vende de verdad',
    'services.s4.prefill': 'Posts sociales y Meta Ads',

    'process.title': 'Del brief<br>al lanzamiento.',
    'process.lede': 'Cuatro pasos. Tus películas llegan 48 horas después de acordar el brief.',
    'process.st1.title': 'Brief',
    'process.st1.desc': 'Cuéntanos qué vendes, para quién es y dónde correrán los anuncios. Un formulario breve o un mensaje rápido bastan para empezar.',
    'process.st1.clock': '<b>Hora 0</b> El reloj empieza a correr cuando aprobamos el brief.',
    'process.st2.title': 'Guion y personajes',
    'process.st2.desc': 'Escribimos una historia con principio, desarrollo y giro. Luego elegimos el reparto: cada personaje recibe una ficha de cuatro vistas para verse igual en cada plano.',
    'process.st2.clock': '<b>Dentro de las 48 horas</b> Historia antes que píxeles.',
    'process.st3.title': 'Película',
    'process.st3.desc': 'Escenas, primeros planos del producto, banda sonora y diseño de sonido, cerrando con el logo de tu marca. Recibes tres anuncios, con una revisión incluida.',
    'process.st3.clock': '<b>Hora 48</b> Tres películas entregadas.',
    'process.st4.title': 'Lanzamiento',
    'process.st4.desc': 'Si lo deseas, montamos las películas en una campaña de Meta: estructura, audiencias, píxel y prueba creativa. Si no, los archivos son tuyos para publicarlos.',
    'process.st4.clock': '<b>Tras la entrega</b> Configuración opcional en Meta.',

    'studio.title': 'Detrás<br>de cámaras.',
    'studio.lede': 'Cómo mantenemos la coherencia de los personajes: antes de generar una sola escena, cada integrante de la película recibe una ficha con cuatro vistas. Primer plano del rostro, cuerpo entero frontal, perfil lateral y espalda.',
    'studio.p2': 'Esa hoja es la referencia para cada toma: por eso Alvaro conserva el mismo rostro en la puerta y en la mesa, y Caramelo mantiene su oreja rasgada.',
    'studio.c1': '<b>Historia primero</b> Un guion con giro escrito antes de renderizar cualquier imagen.',
    'studio.c2': '<b>Personajes consistentes</b> Una ficha de cuatro vistas por personaje, humano o gato.',
    'studio.c3': '<b>Primeros planos del producto</b> Planos que resaltan el producto y los detalles de marca.',
    'studio.c4': '<b>Diseño sonoro</b> Música y sonido creados para el montaje, no solo pegados debajo.',
    'studio.c5': '<b>Cierre con logo</b> Cada película termina con la identidad de tu marca.',
    'studio.who': 'Castro Creative está dirigida por Isaque B. Castro, especialista en tráfico pago con base en Portugal, trabajando con marcas en EE. UU., Reino Unido y la Unión Europea.',
    'studio.sheetsAria': 'Fichas de personaje utilizadas en las películas',
    'studio.sh1Alt': 'Ficha de personaje de Alvaro: primer plano, cuerpo completo de frente, perfil lateral y espalda de un hombre mayor con abrigo oscuro y bufanda verde',
    'studio.sh1Cap': '<b>Alvaro</b> El Pastel de la Infancia',
    'studio.sh2Alt': 'Ficha de personaje de Ines: cuatro vistas de una niña con trenzas, impermeable amarillo y botas rojas',
    'studio.sh2Cap': '<b>Ines</b> El Pastel de la Infancia',
    'studio.sh3Alt': 'Ficha de personaje de Lucia: cuatro vistas de una pastelera con gafas y delantal con harina',
    'studio.sh3Cap': '<b>Lucia</b> El Pastel de la Infancia',
    'studio.sh4Alt': 'Ficha de personaje de Armando: cuatro vistas de un anciano con abrigo de lana verde y bufanda roja',
    'studio.sh4Cap': '<b>Armando</b> ¿Quién Adoptó a Quién?',
    'studio.sh5Alt': 'Ficha de personaje de Caramelo: cuatro vistas de un gato naranja con una oreja rasgada',
    'studio.sh5Cap': '<b>Caramelo</b> ¿Quién Adoptó a Quién?',
    'studio.logosNote': 'Logotipos creados para los films conceptuales. Ambas marcas son ficticias.',
    'studio.logo1Alt': 'Logo de Linden & Rose, una florería ficticia',
    'studio.logo2Alt': 'Logo de Rosewater & Crumb, una pastelería ficticia',

    'why.title': 'Por qué funciona.',
    'why.1.title': 'La emoción es lo que permanece.',
    'why.1.desc': 'Una lista de funciones pide atención. Una historia se la gana, y tu marca está ahí justo cuando llega el sentimiento.',
    'why.2.title': 'Los personajes no se rompen.',
    'why.2.desc': 'El mismo rostro, el mismo abrigo, el mismo gato en cada corte. Nada rompe la magia a mitad de camino.',
    'why.3.title': 'El producto tiene su momento.',
    'why.3.desc': 'Entra cuando la historia lo pide, en primer plano, para ser deseado en lugar de simplemente anunciado.',
    'why.4.title': 'Creado por quien gestiona anuncios.',
    'why.4.desc': 'Los guiones nacen de la mano de un especialista en Meta Ads, pensando en ubicación, formato y testeo.',

    'faq.title': 'Preguntas<br>frecuentes.',
    'faq.q1': '¿Cuál es el plazo de entrega?',
    'faq.a1': 'Los paquetes de video se entregan en 48 horas tras aprobar el brief. Fotos, sitios web y posts sociales se cotizan con su propio calendario según alcance.',
    'faq.q2': '¿Cuántas revisiones incluye?',
    'faq.a2': 'El paquete incluye una revisión. Si prevés necesitar más rondas, indícalo en tu mensaje y lo contemplamos en el presupuesto.',
    'faq.q3': '¿En qué formatos pueden entregar?',
    'faq.a3': 'Los habituales para pauta social y más: 9:16 para Reels, Stories y TikTok, 1:1 para el feed y 21:9 en formato cinematográfico como ves en esta página. Dinos dónde correrán los anuncios y acordamos los formatos en el presupuesto.',
    'faq.q4': '¿Quién puede usar las películas y dónde?',
    'faq.a4': 'Los derechos de uso se acuerdan por escrito en tu presupuesto antes de empezar. Cuéntanos en qué canales y países vas a pautar y durante cuánto tiempo.',
    'faq.q5': '¿Las películas de esta página son trabajos de clientes?',
    'faq.a5': 'No. Son films conceptuales hechos como muestra de portafolio. Linden & Rose y Rosewater & Crumb son marcas ficticias creadas para estas piezas.',
    'faq.q6': '¿También gestionan las campañas?',
    'faq.a6': 'Sí: la configuración y gestión de Meta Ads es uno de nuestros cuatro servicios — estructura de campaña, audiencias, píxel y pruebas creativas en Facebook e Instagram. También puedes llevarte las piezas y correrlas por tu cuenta.',
    'faq.q7': '¿Cómo empiezo?',
    'faq.a7': 'Usa el formulario de abajo. Cuéntanos sobre tu marca, el producto y dónde correrán los anuncios, y te enviaremos un presupuesto. <a href="#contact">Empezar un proyecto</a>.',

    'contact.title': 'Hagamos que<br>la gente<br>sienta algo.',
    'contact.lede': 'Cuéntanos sobre la marca y el producto. Recibirás un presupuesto sin compromiso.',
    'contact.fact1': 'anuncios en video con IA en el paquete',
    'contact.fact2': 'entrega',
    'contact.fact3': 'revisión incluida',
    'contact.formTitle': 'Empezar un proyecto',
    'contact.hpLabel': 'Sitio web',
    'contact.nameLabel': 'Tu nombre',
    'contact.nameErr': 'Escribe tu nombre para saber a quién responder.',
    'contact.emailLabel': 'Correo electrónico',
    'contact.emailErr': 'Ingresa un correo válido como nombre@marca.com.',
    'contact.waLabel': 'WhatsApp (con código de país)',
    'contact.waPlaceholder': '+34 612 345 678',
    'contact.waErr': 'Ingresa un teléfono válido con prefijo internacional, o déjalo vacío.',
    'contact.brandLabel': 'Marca o sitio web',
    'contact.msgLabel': '¿Qué vendes y dónde correrán los anuncios?',
    'contact.msgErr': 'Escribe un par de líneas sobre el proyecto.',
    'contact.submit': 'Enviar solicitud',
    'contact.sending': 'Enviando...',
    'contact.sendEmail': 'Enviar por correo',
    'contact.sendWa': 'Enviar por WhatsApp',
    'contact.copy': 'Copiar mensaje',
    'contact.noteInitial': 'Envía tu solicitud directamente, o usa tu app de correo, WhatsApp o copia el mensaje.',
    'contact.noteInvalid': 'Revisa los campos resaltados e inténtalo de nuevo.',
    'contact.confirmSuccess': '¡Gracias! Recibimos tu solicitud. Responderemos dentro de las próximas 24 horas.',
    'contact.noteAfterSuccess': 'También puedes copiar o enviar una copia por correo abajo si prefieres.',
    'contact.noteSubmitErr': 'No pudimos guardar tu solicitud ahora. Prueba enviando por correo o copiando el mensaje abajo.',
    'contact.noteEmailOpened': 'Tu app de correo debería abrirse con el mensaje listo. Solo dale a enviar allí.',
    'contact.noteWaOpened': 'Se abrió WhatsApp en una nueva pestaña con tu mensaje listo. Solo envíalo allí.',
    'contact.noteCopied': 'Mensaje copiado.',
    'contact.noteCopyErr': 'Error al copiar. Selecciona el texto del formulario y cópialo manualmente.',
    'contact.cooldownWait': 'Por favor espera {secs} segundos antes de enviar otra solicitud.',
    'contact.cooldownLimit': 'Has enviado varias solicitudes recientemente. Inténtalo de nuevo en unos minutos.',
    'contact.quotePrefix': 'Presupuesto para: ',
    'contact.linkEmail': 'Correo',
    'contact.linkWa': 'WhatsApp',
    'contact.linkWaText': 'Escríbenos por WhatsApp',
    'contact.linkIg': 'Instagram',

    'msg.greeting': 'Hola Castro Creative,',
    'msg.name': 'Nombre',
    'msg.email': 'Correo',
    'msg.whatsapp': 'WhatsApp',
    'msg.brand': 'Marca / sitio web',
    'msg.interest': 'Interés en',
    'msg.footer': 'Enviado desde el sitio web de Castro Creative',
    'msg.subject': 'Nueva consulta de proyecto',

    'footer.legal': '© 2026 Castro Creative. Anuncios en video con IA y campañas en Meta, hecho en Portugal.',
    'footer.top': 'Volver arriba',

    'player.defaultTitle': 'Película',
    'player.close': 'Cerrar <kbd aria-hidden="true">Esc</kbd>',
    'player.note': 'Film conceptual con sonido. Espacio reproduce y pausa.',
    'player.conceptSuffix': ' · Film conceptual',
  },
};

let currentLang = DEFAULT_LANG;

export function detectLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED_LANGS.includes(saved)) return saved;
  } catch {
    // ignore storage errors
  }
  const list = navigator.languages && navigator.languages.length
    ? navigator.languages
    : [navigator.language || ''];
  for (const raw of list) {
    const l = String(raw || '').toLowerCase();
    if (l.startsWith('pt')) return 'pt';
    if (l.startsWith('es')) return 'es';
    if (l.startsWith('en')) return 'en';
  }
  return DEFAULT_LANG;
}

export function getLang() {
  return currentLang;
}

export function t(key, vars) {
  const table = DICT[currentLang] || DICT[DEFAULT_LANG];
  let val = table[key] ?? DICT[DEFAULT_LANG][key] ?? '';
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      val = val.replaceAll(`{${k}}`, String(v));
    }
  }
  return val;
}

function splitLinesPreserve(el) {
  const wasIn = el.classList.contains('is-in');
  const motion = document.documentElement.classList.contains('motion');
  if (!motion) return;
  const parts = el.innerHTML.split(/<br\s*\/?>/i);
  el.innerHTML = parts.map((h, i) => `<span class="ln" style="--i:${i}"><span>${h.trim()}</span></span>`).join(' ');
  el.classList.add('is-split');
  if (wasIn) el.classList.add('is-in');
}

function updateSeo(lang) {
  const setMeta = (selector, attr, val) => {
    const el = document.querySelector(selector);
    if (el && val) el.setAttribute(attr, val);
  };

  document.title = t('seo.title');
  setMeta('meta[name="description"]', 'content', t('seo.description'));
  setMeta('meta[property="og:title"]', 'content', t('seo.ogTitle'));
  setMeta('meta[property="og:description"]', 'content', t('seo.ogDescription'));
  setMeta('meta[property="og:image:alt"]', 'content', t('seo.ogTitle'));
  setMeta('meta[name="twitter:title"]', 'content', t('seo.ogTitle'));
  setMeta('meta[name="twitter:description"]', 'content', t('seo.ogDescription'));

  const ld = document.querySelector('script[type="application/ld+json"]');
  if (ld) {
    try {
      const json = JSON.parse(ld.textContent || '{}');
      json.description = t('seo.description');
      ld.textContent = JSON.stringify(json, null, 2);
    } catch {
      // ignore invalid json-ld
    }
  }
  document.documentElement.lang = lang;
  document.documentElement.dataset.lang = lang;
}

export function applyI18n(lang, { resplit = false } = {}) {
  const next = SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG;
  currentLang = next;
  updateSeo(next);

  document.querySelectorAll('[data-set-lang]').forEach((btn) => {
    const active = btn.dataset.setLang === next;
    btn.setAttribute('aria-pressed', String(active));
  });

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });

  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    el.innerHTML = t(el.dataset.i18nHtml);
    if (resplit && el.hasAttribute('data-lines')) {
      splitLinesPreserve(el);
    }
  });

  document.querySelectorAll('[data-i18n-words]').forEach((el) => {
    el.textContent = t(el.dataset.i18nWords);
  });

  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    el.setAttribute('aria-label', t(el.dataset.i18nAria));
  });

  document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
    el.setAttribute('alt', t(el.dataset.i18nAlt));
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    el.setAttribute('placeholder', t(el.dataset.i18nPlaceholder));
  });

  document.querySelectorAll('[data-i18n-prefill]').forEach((el) => {
    el.dataset.prefill = t(el.dataset.i18nPrefill);
  });

  document.querySelectorAll('[data-i18n-film-title]').forEach((el) => {
    el.dataset.title = t(el.dataset.i18nFilmTitle);
  });

  document.querySelectorAll('[data-i18n-film-meta]').forEach((el) => {
    el.dataset.meta = t(el.dataset.i18nFilmMeta);
  });

  document.documentElement.classList.remove('i18n-pending');
  document.dispatchEvent(new CustomEvent('cc:langchange', { detail: { lang: next, resplit } }));
}

export function setLang(lang) {
  const next = SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG;
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // ignore storage errors
  }
  applyI18n(next, { resplit: true });
}

export function initI18n() {
  const initial = detectLang();
  applyI18n(initial, { resplit: false });

  document.querySelectorAll('[data-set-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      setLang(btn.dataset.setLang);
    });
  });

  return initial;
}
