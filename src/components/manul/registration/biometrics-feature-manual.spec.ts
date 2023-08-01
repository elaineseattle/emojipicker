describe('Validate Bio Metric  Scenarios', () => {
  // TODO: Reference https://confluence.sys.cigna.com/display/CustomerValueStream/Biometrics+Testing

  it('Verify known user with Biometrics enabled', () => {
    // TODO: User not prompted for password, but taken to Biometric screen for Identity Verification.
  });

  it('Verify known user with Biometrics not enabled', () => {
    // TODO: Prompt user for password
  });

  it('Verify Biometrics screen when user navigates away from verification screen', () => {
    // TODO: Alert message?
  });

  it('Verify Use Password functionality on biometrics screen', () => {
    // TODO: Prompt user for password
  });

  it('Verify Continue functionality', () => {
    // TODO: Prompt user for biometric verification. Upon success, take to welcome page
  });

  it('Verify unsuccessful biometric verification', () => {
    // TODO: error message? / allow user to login using password?
  });
});
