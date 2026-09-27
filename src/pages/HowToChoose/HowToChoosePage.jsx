
import React, { useState } from "react";
import "./HowToChoosePage.css";

const questions = [
  {
    id: 1,
    number: "01",
    question: "دليل المبتدئين",
    answer: (
      <>
        <div className="guide-answer-section">
          <h4>حدد سبب استخدامك للفيب</h4>

          <p>
            إجابتك هنا هتساعدنا نحدد الاختيار المناسب ليك.
          </p>

          <p>
            لو كنت بتدخن وبتدور على بديل قريب من إحساس السجائر، ممكن
            يناسبك جهاز MTL بسيط زي Vozol Star 40K.
            أما لو الفيب بالنسبة لك تجربة وهواية، فـ DL والسحبات الكبيرة
            ممكن تكون الأنسب ليك.
          </p>
        </div>

        <div className="guide-answer-section">
          <h4>اختار تركيز النيكوتين المناسب</h4>

          <p>
            لو كنت مدخّن سابقًا، ممكن تبدأ بتركيز 25–50 مجم، وبعدها تقلل
            التركيز تدريجيًا مع الوقت.
          </p>

          <p>
            ولو مش مدخّن أو بتدخن بشكل خفيف، اختار تركيز أقل من البداية.
          </p>
        </div>

        <div className="guide-answer-section">
          <h4>اختار أول نكهة ليك</h4>

          <p>
            لو بتنتقل من السجائر، النكهات القريبة من التبغ ممكن تساعدك
            في البداية.
          </p>

          <p>
            أما لو عايز تجربة مختلفة، ممكن تبدأ بنكهات الفواكه.
            مفيش نكهة واحدة مناسبة للجميع، فجرّب أكتر من نوع لحد ما
            تلاقي النكهة اللي تناسبك.
          </p>
        </div>

        <div className="guide-answer-section">
          <h4>اشتري من مصدر موثوق</h4>

          <p>
            جودة الجهاز والسائل بتفرق في تجربة الاستخدام.
          </p>

          <p>
            في VOZOL EGY بنوفر منتجات أصلية ومضمونة 100%.
          </p>
        </div>
      </>
    ),
  },

  {
    id: 2,
    number: "02",
    question: "الفرق بين جهاز MTL & DL",
    answer: (
      <>
        <div className="guide-comparison">
          <div className="comparison-card">
            <div className="comparison-tag">MTL</div>

            <h3>Mouth To Lung</h3>

            <p>
              سحبة أضيق وأقرب لإحساس السيجارة التقليدية، حيث يتم سحب البخار
              إلى الفم أولًا ثم إلى الرئة.
            </p>

            <ul>
              <li>سحبة أضيق وهادئة</li>
              <li>بخار أقل</li>
              <li>إحساس قريب من التدخين التقليدي</li>
              <li>مناسب لمن يفضل السحبة الهادئة</li>
            </ul>
          </div>

          <div className="comparison-card">
            <div className="comparison-tag">DL</div>

            <h3>Direct To Lung</h3>

            <p>
              سحبة مباشرة إلى الرئة مع تدفق هواء أكبر، وغالبًا ما تنتج
              كمية بخار أكبر.
            </p>

            <ul>
              <li>سحبة أوسع</li>
              <li>بخار أكثر</li>
              <li>إحساس أقوى بالنكهة</li>
              <li>مناسب لمن يفضل السحبات الكبيرة</li>
            </ul>
          </div>
        </div>

        <div className="guide-note">
          <span>TIP</span>

          <p>
            لو بتدور على إحساس أقرب للسحبة التقليدية، ابدأ بمقارنة أجهزة
            MTL. ولو تفضل سحبة واسعة وبخار أكثر، قارن أجهزة DL.
          </p>
        </div>
      </>
    ),
  },

  {
    id: 3,
    number: "03",
    question: "كيف تختار نكهة الفيب المناسبة لك؟",
    answer: (
      <>
        <div className="guide-answer-section">
          <h4>إزاي تختار أول نكهة فيب؟</h4>

          <p>
            اختيار النكهة في أول تجربة ممكن يأثر على انطباعك عن الفيب
            بشكل كبير.
          </p>

          <p>
            النكهة المناسبة هتخلي التجربة أسهل وأمتع، عشان كده اختار
            نكهة قريبة من ذوقك.
          </p>
        </div>

        <div className="guide-answer-section">
          <h4>🍂 نكهات التبغ — لو جاي من التدخين</h4>

          <p>
            لو لسه بتنتقل من السجائر، نكهات Tobacco ممكن تكون اختيار
            مناسب كبداية.
          </p>

          <p>
            هتلاقي منها أنواع مختلفة زي التبغ الكلاسيكي والتبغ بالفانيليا،
            وكل نوع ليه طعم مختلف شوية عن السيجارة التقليدية.
          </p>
        </div>

        <div className="guide-answer-section">
          <h4>🥭 نكهات الفواكه — لو عايز تجربة مختلفة</h4>

          <p>
            لو عايز تبعد عن طعم السجائر وتجرب حاجة جديدة، نكهات الفواكه
            فيها اختيارات كتير.
          </p>

          <p>
            من النكهات المشهورة المانجو، البطيخ، والفراولة، لأنها مألوفة
            وسهلة التجربة.
          </p>
        </div>

        <div className="guide-answer-section">
          <h4>🥤 نكهات المشروبات والحلويات</h4>

          <p>
            لو بتحب النكهات الغنية والمختلفة، ممكن تجرب نكهات زي الكولا،
            مشروبات الطاقة والحلويات.
          </p>

          <p>
            الفئة دي بتوفر اختيارات متنوعة للي عايز يجرب طعم مختلف.
          </p>
        </div>

        <div className="guide-answer-section">
          <h4>💡 نصيحة: ابدأ بنكهة أو اتنين</h4>

          <p>
            بدل ما تشتري نكهات كتير من أول مرة، ابدأ بـ نكهة أو اتنين.
          </p>

          <p>
            جرّبهم الأول، وبعدها هتعرف إيه اللي يناسب ذوقك وتقدر تختار
            نكهات جديدة بسهولة.
          </p>
        </div>

        <div className="guide-answer-section">
          <h4>❄️ إيه الفرق بين النكهة العادية و ICE؟</h4>

          <p>
            بعض النكهات بتكون متوفرة بنسخة ICE أو Super Cool.
          </p>

          <p>
            بتكون نفس النكهة الأساسية، لكن مع إحساس بارد ومنعش أثناء السحب.
          </p>

          <p>
            لو بتحب الإحساس البارد، ممكن تجرب النسخة المثلجة من النكهة
            اللي بتحبها.
          </p>
        </div>
      </>
    ),
  },

  {
    id: 4,
    number: "04",
    question: "ليه جهازك يبقى disposable ؟",
    answer: (
      <>
        <div className="guide-answer-section">
          <h4>جهاز جاهز بالكامل</h4>

          <p>
            جهاز جاهز للاستخدام، بيحتوي على السائل والبطارية والكويل في
            جهاز واحد.
          </p>

          <p>
            استخدمه لحد ما يخلص، وبعدها تقدر تستبدله بواحد جديد.
          </p>

          <p>
            مفيش تعبئة، ولا شحن، ولا صيانة.
          </p>

          <p>
            بسيط وسهل الاستخدام، من غير أي إعدادات، ومناسب للسفر أو كتجربة
            أولى. كمان سعره بيكون مناسب كبداية.
          </p>
        </div>
      </>
    ),
  },
];

const HowToChoosePage = () => {
  const [openQuestion, setOpenQuestion] = useState(2);

  const toggleQuestion = (id) => {
    setOpenQuestion((current) => (current === id ? null : id));
  };

  return (
    <main className="how-to-choose-page">
      {/* HERO */}
      <section className="guide-hero">
        <div className="guide-hero-glow guide-glow-one" />
        <div className="guide-hero-glow guide-glow-two" />

        <div className="guide-hero-content">
          <h1>
            HOW TO
            <span>CHOOSE YOUR VAPE</span>
          </h1>

          <p className="guide-hero-description">
            مش عارف تبدأ منين؟
            <br />
            خلينا نساعدك تفهم الاختيارات وتحدد الأنسب ليك.
          </p>
        </div>

        <div className="guide-visual">
          <div className="guide-orbit orbit-one" />
          <div className="guide-orbit orbit-two" />
          <div className="guide-orbit orbit-three" />

          <div className="guide-center">
            <span>?</span>
          </div>

          <div className="guide-floating-card card-top">
            <span>01</span>
            <strong>UNDERSTAND</strong>
          </div>

          <div className="guide-floating-card card-bottom">
            <span>02</span>
            <strong>COMPARE</strong>
          </div>
        </div>
      </section>

      {/* INTRO */}
      {/* <section className="guide-intro">
        <div className="guide-intro-label">
          <span>01</span>
          START HERE
        </div>

        <div className="guide-intro-content">
          <h2>
            FIND WHAT
            <span>FITS YOU.</span>
          </h2>

          <p>
            مفيش اختيار واحد مناسب لكل الناس. طريقة السحب، النكهة،
            وحجم الجهاز كلها عوامل بتفرق في تجربة كل شخص.
          </p>
        </div>
      </section> */}

      {/* STEPS */}
      {/* <section className="guide-steps">
        <div className="guide-step">
          <span className="step-number">01</span>

          <div>
            <span className="step-label">FIRST</span>
            <h3>UNDERSTAND</h3>
            <p>افهم الفرق بين أنواع السحب والأجهزة.</p>
          </div>
        </div>

        <div className="guide-step">
          <span className="step-number">02</span>

          <div>
            <span className="step-label">THEN</span>
            <h3>COMPARE</h3>
            <p>قارن المواصفات والاختيارات المتاحة.</p>
          </div>
        </div>

        <div className="guide-step">
          <span className="step-number">03</span>

          <div>
            <span className="step-label">FINALLY</span>
            <h3>CHOOSE</h3>
            <p>اختار الخيار الأقرب لاحتياجاتك.</p>
          </div>
        </div>
      </section> */}

      {/* QUESTIONS */}
      <section className="guide-questions">
        <div className="questions-heading">
          <div>
            {/* <span className="section-eyebrow">02 — QUESTIONS</span> */}

            <h2>
              GOT
              <span>QUESTIONS?</span>
            </h2>
          </div>

          <p>
            كل اللي محتاج تعرفه قبل ما تختار جهازك.
          </p>
        </div>

        <div className="modern-faq">
          {questions.map((item) => {
            const isOpen = openQuestion === item.id;

            return (
              <div
                className={`modern-faq-item ${
                  isOpen ? "is-open" : ""
                }`}
                key={item.id}
              >
                <button
                  type="button"
                  className="modern-faq-question"
                  onClick={() => toggleQuestion(item.id)}
                  aria-expanded={isOpen}
                >
                  <div className="faq-question-left">
                    <span className="faq-number">
                      {item.number}
                    </span>

                    <span className="faq-question-text">
                      {item.question}
                    </span>
                  </div>

                  <span
                    className={`faq-plus ${
                      isOpen ? "active" : ""
                    }`}
                  >
                    <span />
                    <span />
                  </span>
                </button>

                <div
                  className={`modern-faq-answer ${
                    isOpen ? "answer-open" : ""
                  }`}
                >
                  <div className="modern-faq-answer-inner">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* BOTTOM CTA */}
      {/* <section className="guide-bottom">
        <div className="guide-bottom-number">03</div>

        <div className="guide-bottom-content">
          <span>STILL NOT SURE?</span>

          <h2>
            WE'RE HERE
            <span>TO HELP.</span>
          </h2>

          <p>
            لو محتاج مساعدة في اختيار الجهاز أو النكهة المناسبة،
            تواصل معانا.
          </p>
        </div>

        <div className="guide-bottom-arrow">↗</div>
      </section> */}
    </main>
  );
};

export default HowToChoosePage;
