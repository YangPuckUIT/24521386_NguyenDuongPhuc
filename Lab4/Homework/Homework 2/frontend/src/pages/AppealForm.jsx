import { NavLink } from "react-router";
import { useFormContext } from "../context/FormContext";
import { InputField } from "../components/InputField";
import { ShowData } from "../components/ShowData";

export default function AppealForm() {
  const {
    values,
    errors,
    touched,
    submitted,
    handleChange,
    handleBlur,
    resetForm,
  } = useFormContext();

  return (
    <div className="appeal-page">
      <header className="page-header">
        <NavLink to="/dossier/himass" className="back-link">
          ← Player dossiers
        </NavLink>

        <span className="eyebrow">FAIR-PLAY TRIBUNAL / SUBMISSION</span>
        <h1>Submit an Appeal</h1>
        <p>
          Provide the case details and explain why the decision should be
          reviewed.
        </p>
      </header>

      <div className="appeal-grid">
        <section className="form-panel">
          <div className="panel-heading">
            <span className="section-number">01</span>
            <div>
              <h2>Appeal information</h2>
              <p>All fields marked with * are required.</p>
            </div>
          </div>

          <InputField
            label="Player ID *"
            name="playerId"
            value={values.playerId}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.playerId ? errors.playerId : ""}
            placeholder="e.g. HIMASS-001"
          />

          <div className="field-group">
            <label htmlFor="appealType">Appeal type *</label>

            <select
              id="appealType"
              name="appealType"
              value={values.appealType}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(touched.appealType && errors.appealType)}
              aria-describedby={
                touched.appealType && errors.appealType
                  ? "appeal-type-error"
                  : undefined
              }
              className="field-control"
            >
              <option value="">Select an appeal type</option>
              <option value="Penalty review">Penalty review</option>
              <option value="Evidence dispute">Evidence dispute</option>
              <option value="Match integrity">Match integrity</option>
              <option value="Other">Other</option>
            </select>

            {touched.appealType && errors.appealType && (
              <span
                id="appeal-type-error"
                className="field-message"
                role="alert"
              >
                {errors.appealType}
              </span>
            )}
          </div>

          <InputField
            label="Reason for appeal *"
            as="textarea"
            name="reason"
            rows={5}
            value={values.reason}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.reason ? errors.reason : ""}
            placeholder="Explain what happened and why you disagree with the decision..."
          />

          <InputField
            label="Evidence URL"
            type="url"
            name="evidenceUrl"
            value={values.evidenceUrl}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.evidenceUrl ? errors.evidenceUrl : ""}
            placeholder="https://example.com/evidence"
          />

          <div className="form-actions">
            <button
              type="button"
              className="button-secondary"
              onClick={resetForm}
            >
              Clear form
            </button>

            <button type="submit" className="button-primary">
              Submit appeal
            </button>
          </div>

          {submitted && (
            <div className="success-message" role="status">
              <strong>Appeal information validated.</strong>
              <p>Your form is ready for backend submission.</p>
            </div>
          )}
        </section>

        <aside className="preview-panel">
          <span className="eyebrow">LIVE PREVIEW</span>
          <h2>Submission overview</h2>
          <p>Review the information entered in the form.</p>

          <ShowData data={values} />

          <div className="preview-note">
            <strong>Before submitting</strong>
            <p>Make sure your player ID and appeal explanation are accurate.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
