
import React, { useState } from "react";
import "./HowToChoosePage.css";

const questions = [
  {
    id: 1,
    number: "01",
    question: "دليل المبتدئين",
    answer: (
      <>
        <p>
          لو دي أول مرة تختار فيها جهاز فيب، أهم حاجة تبدأ بفهم طريقة السحب
          المناسبة ليك، حجم الجهاز، وتركيز النيكوتين.
        </p>

        <p>
          لو بتحب إحساس قريب من السيجارة التقليدية والسحبة الهادية،
          أجهزة MTL بتكون أقرب للتجربة دي.
        </p>

        <p>
          أما لو بتفضل سحبة أكبر وبخار أكثر، ممكن تلاقي أجهزة DL أنسب
          لطريقة استخدامك.
        </p>
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
        <p>
          اختيار النكهة بيعتمد بشكل أساسي على ذوقك الشخصي. لو بتحب النكهات
          المنعشة، ممكن تبدأ بنكهة Ice أو Mint.
        </p>

        <p>
          ولو بتحب الطعم الحلو والفواكه، جرب نكهات مثل Mango أو Berry
          أو النكهات المركبة.
        </p>

        <p>
          الأفضل تبدأ بنكهات قريبة من الأذواق اللي بتحبها بالفعل بدل
          تجربة نكهات عشوائية.
        </p>
      </>
    ),
  },
  {
    id: 4,
    number: "04",
    question: "ليه جهازك يبقى disposable ؟",
    answer: (
      <>
        <p>
          أجهزة الـDisposable مصممة لتكون بسيطة وسهلة الاستخدام، بدون
          الحاجة لإعادة تعبئة السائل أو تغيير أجزاء الجهاز بشكل متكرر.
        </p>

        <p>
          لذلك قد تكون مناسبة لمن يبحث عن تجربة استخدام مباشرة وبأقل
          خطوات ممكنة.
        </p>
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
          <div className="guide-badge">
            <span className="guide-badge-dot" />
            VAPE GUIDE
          </div>

          <h1>
            HOW TO
            <span>CHOOSE YOUR VAPE</span>
          </h1>

          <p className="guide-hero-description">
            مش عارف تبدأ منين؟
            <br />
            خلينا نساعدك تفهم الاختيارات وتحدد الأنسب ليك.
          </p>

          <div className="guide-scroll">
            <span>EXPLORE GUIDE</span>
            <span className="guide-scroll-line" />
          </div>
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
      <section className="guide-intro">
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
      </section>

      {/* STEPS */}
      <section className="guide-steps">
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
      </section>

      {/* QUESTIONS */}
      <section className="guide-questions">
        <div className="questions-heading">
          <div>
            <span className="section-eyebrow">02 — QUESTIONS</span>

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
      <section className="guide-bottom">
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
      </section>
    </main>
  );
};

export default HowToChoosePage;
