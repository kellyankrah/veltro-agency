/**
 * Short, plain-language privacy note shown just above the submit button on
 * every application/registration form, since each one collects some mix of
 * name, email, phone, resume, or links. One shared copy so the wording
 * can't drift between the four forms.
 */
export function PrivacyNote() {
  return (
    <p className="text-[13px] text-black/50">
      Your information will only be used to review and manage your
      TEDxGramblingStateUniversity participation.
    </p>
  );
}
