$(document).ready(function () {
    /*默认语言*/
    const lang = localStorage.getItem("lang");
    const defaultLang = lang ? lang : "en";
    $("[i18n]").i18n({
        defaultLang: defaultLang,
        filePath: "assets/i18n/",
        filePrefix: "i18n_",
        fileSuffix: "",
        forever: true,
        callback: function () {
            console.log("i18n is ready.");
            // 强制用html渲染about__description和手动渲染qualification所有字段
            const aboutDesc = $("[i18n='about__description']");
            const lang = localStorage.getItem("lang") || defaultLang;
            $.getJSON(`assets/i18n/i18n_${lang}.json`, function (data) {
                aboutDesc.html(data['about__description']);
                [
                    "qualification1__title", "qualification1__subtitle", "qualification1__date",
                    "qualification2__title", "qualification2__subtitle", "qualification2__date",
                    "qualification3__title", "qualification3__subtitle", "qualification3__date",
                    "cert1__title", "cert1__subtitle", "cert1__date",
                    "cert2__title", "cert2__subtitle", "cert2__date",
                    "cert3__title", "cert3__subtitle", "cert3__date"
                ].forEach(function (key) {
                    $("[i18n='" + key + "']").text(data[key]);
                });
            });
        },
    });

    /*中英文切换按钮*/
    const text = defaultLang == "cn" ? "中/En" : "En/中";
    $("#nav__translate").text(text);
    $("#translate").click(function (e) {
        const currentLang = localStorage.getItem("lang") ? localStorage.getItem("lang") : defaultLang;
        const targetLang = currentLang == "cn" ? "en" : "cn";
        const text = targetLang == "cn" ? "中/En" : "En/中";
        $("#nav__translate").text(text);

        $("[i18n]").i18n({
            defaultLang: targetLang,
            filePath: "assets/i18n/",
            callback: function () {
                localStorage.setItem("lang", targetLang);
                console.log(localStorage.getItem("lang"));
                // 强制用html渲染about__description和手动渲染qualification所有字段
                const aboutDesc = $("[i18n='about__description']");
                $.getJSON(`assets/i18n/i18n_${targetLang}.json`, function (data) {
                    aboutDesc.html(data['about__description']);
                    [
                        "qualification1__title", "qualification1__subtitle", "qualification1__date",
                        "qualification2__title", "qualification2__subtitle", "qualification2__date",
                        "qualification3__title", "qualification3__subtitle", "qualification3__date",
                        "cert1__title", "cert1__subtitle", "cert1__date",
                        "cert2__title", "cert2__subtitle", "cert2__date",
                        "cert3__title", "cert3__subtitle", "cert3__date"
                    ].forEach(function (key) {
                        $("[i18n='" + key + "']").text(data[key]);
                    });
                });
            }
        });
    });
});

var translations = {
    // Work Experience translations
    qualification4__title: {
        cn: "数字游民",
        en: "Digital Nomad"
    },
    qualification4__subtitle: {
        cn: "使用AI技术为北美B端客户提供各类远程支持，如制作商业PPT Slides、Reddit图文",
        en: "Providing remote support for North American B2B clients using AI technology, including business PPT slides and Reddit content creation"
    },
    qualification4__date: {
        cn: "2024 - now",
        en: "2024 - Present"
    },

    qualification5__title: {
        cn: "港城大东莞学生处SDO学助",
        en: "SDO Student Assistant at CityU-DG"
    },
    qualification5__subtitle: {
        cn: "协助校方组织开展企业招聘会、秀米公众号推文制作、宣讲会海报制作等",
        en: "Assisting in organizing job fairs, creating WeChat articles, and designing recruitment posters"
    },
    qualification5__date: {
        cn: "2025.02 - now",
        en: "Feb 2025 - Present"
    },

    qualification6__title: {
        cn: "企业校园大使",
        en: "Corporate Campus Ambassador"
    },
    qualification6__subtitle: {
        cn: "分别担任美的、宝洁、中兴通讯、蓝思科技驻港城莞校园大使，协助企业入校招聘及企业竞赛宣传",
        en: "Campus ambassador for Midea, P&G, ZTE, and Lens Technology at CityU-DG, supporting campus recruitment and competition promotion"
    },
    qualification6__date: {
        cn: "2024 - 2025",
        en: "2024 - 2025"
    },

    qualification7__title: {
        cn: "Xbotpark CRM实习&校园大使",
        en: "Xbotpark CRM Intern & Campus Ambassador"
    },
    qualification7__subtitle: {
        cn: "负责高校创业者招募&CRM调研，于校内开设校企社区为minicamp及工作坊、夏令营招募各大高校学生",
        en: "Managing entrepreneur recruitment & CRM research, establishing campus-enterprise community for minicamps, workshops, and summer camps"
    },
    qualification7__date: {
        cn: "2025.03 - now",
        en: "Mar 2025 - Present"
    },

    qualification8__title: {
        cn: "CityU-dg创新创业实习",
        en: "CityU-DG Innovation & Entrepreneurship Intern"
    },
    qualification8__subtitle: {
        cn: "构建校内本科生&研究生创新创业氛围，创办各类创新创业活动、协助港城大创赛筹备组举办HK Tech300",
        en: "Fostering innovation among students, organizing entrepreneurship events, and supporting HK Tech300 competition preparation"
    },
    qualification8__date: {
        cn: "2025.04 - now",
        en: "Apr 2025 - Present"
    },

    // Skills translations
    skills__title3: {
        cn: "办公技能",
        en: "Office Skills"
    },
    skills__years3: {
        cn: "专业工具",
        en: "Professional Tools"
    },
    skills__office: {
        cn: "办公三件套",
        en: "Microsoft Office Suite"
    },
    skills__office_tools: {
        cn: "Word、Excel、PowerPoint",
        en: "Word, Excel, PowerPoint"
    },
    skills__xiumi: {
        cn: "公众号推文设计",
        en: "WeChat Article Design"
    },
    skills__xiumi_tools: {
        cn: "秀米",
        en: "Xiumi"
    },
    skills__canva: {
        cn: "海报设计",
        en: "Poster Design"
    },
    skills__canva_tools: {
        cn: "可画",
        en: "Canva"
    },
    skills__email: {
        cn: "企业电邮配置管理",
        en: "Corporate Email Management"
    }
};
