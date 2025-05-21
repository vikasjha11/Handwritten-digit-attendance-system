import React from "react";
import "../App.css";

function KnowMorePage() {
  return (
    <div className="knowmore-main-container">
      <h2 className="knowmore-title">Why Choose Regis.AI?</h2>
      <p className="knowmore-subtitle">
        Regis.AI revolutionizes attendance management for schools, colleges, and organizations. Our AI-powered system transforms sheets into digital records—fast, accurate, and effortless.
      </p>

      <div className="knowmore-features-section">
        <div className="knowmore-feature-box">
          <img src="promo_pics/first.jpg" alt="Upload Sheet" />
          <div>
            <h4>📝 Paper to Digital</h4>
            <p>
              <b>Advantage:</b> No more manual data entry! Simply upload your attendance sheet and Regis.AI will instantly convert it into a digital record. This saves hours of tedious work, reduces human error, and ensures your records are always organized and accessible.
            </p>
          </div>
        </div>
        <div className="knowmore-feature-box">
          <img src="/face_pic/face2.jpg" alt="AI Extraction Result" />
          <div>
            <h4>⚡ AI-Powered Extraction</h4>
            <p>
              <b>Advantage:</b> Our advanced OCR technology accurately extracts roll numbers and names—even from complex or messy handwriting. This means you get reliable, fast results every time, regardless of writing style or sheet format.
            </p>
          </div>
        </div>
        <div className="knowmore-feature-box">
          <img src="/face_pic/face3.jpg" alt="Monthly Summary Example" />
          <div>
            <h4>📊 Monthly Summarizer</h4>
            <p>
              <b>Advantage:</b> Automatically generate monthly attendance summaries, identify debarred students, and export results in one click. This helps you track attendance trends, comply with institutional policies, and communicate efficiently with students.
            </p>
          </div>
        </div>
        <div className="knowmore-feature-box">
          <img src="/promo_pics/fourth.jpg" alt="AttendIQ Insights" />
          <div>
            <h4>🤖 AttendIQ Insights</h4>
            <p>
              <b>Advantage:</b> AttendIQ analyzes your attendance data to detect anomalies, spot trends, and provide actionable insights. Instantly identify students with low attendance, frequent medical leaves, or unusual patterns—empowering you to take timely action.
            </p>
          </div>
        </div>
      </div>

      <div className="knowmore-workflow-section">
        <h3>How It Works</h3>
        <div className="workflow-stepper">
          <div className="workflow-step">
            <div className="workflow-step-label">Step 1</div>
            <div className="workflow-step-desc">
              Select your class, section, and date.
            </div>
          </div>
          <div className="workflow-connector"></div>
          <div className="workflow-step">
            <div className="workflow-step-label">Step 2</div>
            <div className="workflow-step-desc">
              Upload a clear image of your attendance sheet.
            </div>
          </div>
          <div className="workflow-connector"></div>
          <div className="workflow-step">
            <div className="workflow-step-label">Step 3</div>
            <div className="workflow-step-desc">
              Let our AI extract roll numbers and names automatically.
            </div>
          </div>
          <div className="workflow-connector"></div>
          <div className="workflow-step">
            <div className="workflow-step-label">Step 4</div>
            <div className="workflow-step-desc">
              Review, copy, or export the results. Generate attendance messages or mark directly on GEHU ERP.
            </div>
          </div>
          <div className="workflow-connector"></div>
          <div className="workflow-step">
            <div className="workflow-step-label">Step 5</div>
            <div className="workflow-step-desc">
              Use Monthly Summarizer and AttendIQ for deeper analytics and anomaly detection.
            </div>
          </div>
        </div>
      </div>

      <div className="knowmore-cta">
        <p>
          <b style={{ color: "#f55c47" }}>
            Join forward-thinking teams choosing Regis.AI for smarter, streamlined attendance management — built for the future, ready for you.
          </b>
        </p>
        <button className="knowmore-btn" onClick={() => window.location.href = "/"}>Back to Home</button>
      </div>
    </div>
  );
}

export default KnowMorePage;
