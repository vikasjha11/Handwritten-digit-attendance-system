import React from "react";

function HelpPage() {
  return (
    <div className="help-main-container">
      <h2 className="help-title">Need Some Help?</h2>

      <div className="faq-box">
        <div className="faq-question">
          Q1: How does <span className="highlight">Mark Attendance</span> work?
        </div>
        <ol className="faq-steps">
          <li>Go to the Mark Attendance page from your dashboard.</li>
          <li>Enter your class, section, and date information.</li>
          <li>Upload a clear image of your handwritten attendance sheet.</li>
          <li>Click "Upload & Extract" to let the AI read the sheet.</li>
          <li>
            The system will extract roll numbers and/or names. You can copy the results, generate an attendance message, or directly mark attendance on GEHU ERP.
          </li>
          <li>
            If your sheet contains only names (no roll numbers), the system will still generate the attendance message using the extracted names.
          </li>
        </ol>
      </div>

      <div className="faq-box">
        <div className="faq-question">
          Q2: How does the <span className="highlight">Monthly Summarizer</span> work?
        </div>
        <ol className="faq-steps">
          <li>Open the Monthly Summarizer page.</li>
          <li>Fill in your class, section, month, and set the debarred attendance percentage.</li>
          <li>Upload the attendance register image(s) for the month.</li>
          <li>
            Click "Upload & Summarize" to process. The system will extract attendance data for each student and calculate their attendance percentage.
          </li>
          <li>
            You can export the summary as a CSV, copy all results, or generate a message for debarred students.
          </li>
        </ol>
      </div>

      <div className="faq-box">
        <div className="faq-question">
          Q3: What is <span className="highlight">AttendIQ</span>?
        </div>
        <ol className="faq-steps">
          <li>
            AttendIQ analyzes your attendance register image to detect unusual attendance patterns or inconsistencies.
          </li>
          <li>
            It highlights cases such as low attendance, frequent medical leaves, or participation in events, and provides reasons for each flagged case.
          </li>
          <li>
            You will see a summary table with roll numbers, names, attendance percentages, and AttendIQ-generated insights for each student.
          </li>
        </ol>
      </div>

      <div className="help-contact">
        For any queries, support, or feedback, contact us at <b>vikaskumarjha763@gmail.com</b>
      </div>
    </div>
  );
}

export default HelpPage;