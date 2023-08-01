describe.skip('Registration manual validation', () => {
  it('Registration Screen Validation', function () {
    // Open the Evernorth HK application.
    // Click on the Register button.
    // Enter the firstname, lastname, Zip code and DoB and click Next button.
    // Enter the SSN and click Next button.
    // Enter the email to receive authentication codes and click Next button.
    // Enter a password of 9 characters.
    // The password should include a combinations of lowercase and uppercase letters, numbers and special characters.
    // Check the progress bar and check the colours {red, yellow, green}.
    // Make sure that the password entered should be indicating "green" in progress bar.
    // Confirm the password and click Continue button.
    // Redirected to the "Success-Your account has been created" screen.
  });

  it('verification of phone number initialization for a new registered user', function () {
    // Open the Evernorth HK application.
    // Click on the Login button.
    // Enter the registered Email ID and click Continue button.
    // Enter the password and click Continue button.
    // Click the dropdown and select the country for Country code.
    // Enter the phone number and click Continue Button.
    // To verify the phone number enter the OTP received and click Continue Button.
    // Redirected to the Evernorth HK Home screen.
  });

  it('OTP-Phone verification', function () {
    // Open the Evernorth HK application.
    // Click on the Login button.
    // Enter the registered Email ID and click Continue button.
    // Enter the password and click Continue button.
    // To verify the OTP received to the registered phone number:
    // Verify that a valid phone number receives an OTP code.
    // Verify that the OTP code is valid and matches the code sent to the phone number.
    // Verify that the OTP code is only valid for a limit period of time.
    // Verify that a new OTP is generated each time the functionality is triggered.
    // Verify that the OTP is not reusable once it has been used.
    // Enter the OTP and click on the Continue button.
    // Redirected to the Evernorth HK Home screen.
  });

  it('"Try another method" button verification', function () {
    // Open the Evernorth HK application.
    // Click on the Register button.
    // Enter the firstname, lastname, Zip code and DoB and click Next button.
    // Enter the SSN and click Next button.
    // Enter the email to receive authentication codes and click Next button.
    // Enter a password.
    // Confirm the password and click Continue button.
    // Redirected to the "Success-Your account has been created" screen.
    // After a successful registration, the registered Email Id will receive a link to verify.
    // Click on the link to verify the Email ID.
    // Verify that the "Try another method" button is enabled as soon as the email is verified.
    // Click on the 'Try another method' button in 'verify your identity' screen.
    // Select Email and enter the OTP received to the respected Email and click on the Continue button.
    // Redirected to the Evernorth HK Home screen.
  });

  it('OTP-Email verification', function () {
    // Open the Evernorth HK application.
    // Click on the Login button.
    // Enter the registered Email ID and click Continue button.
    // Enter the password and click Continue button.
    // On 'Verify your identity' screen, Click on 'Try Another Method' button.
    // To verify the OTP received to the registered Email ID:
    // Verify that the OTP code is valid and matches the code sent to the email ID.
    // Verify that the OTP code is only valid for a limit period of time.
    // Verify that a new OTP is generated each time the functionality is triggered.
    // Verify that a valid email ID receives an OTP code.
    // Verify that the OTP is not reusable once it has been used.
    // Enter the OTP and click on the Continue button.
    // Redirected to the Evernorth HK Home screen.
  });

  it('Re-Send Code verification', function () {
    // Open the Evernorth HK application.
    // Click on the Login button.
    // Enter the registered Email ID and click Continue button.
    // Enter the password and click Continue button.
    // On 'Verify your identity' screen, Click on 'Resend' button.
    // Verify that the "resend code" functionality sends an new otp code.
    // Verify that the new OTP code is different from the previously sent code.
    // Verify that the new OTP code is sent to the correct Phone or Email.
    // Enter the OTP and click on the Continue button.
    // Redirected to the Evernorth HK Home screen.
  });

  it('"remember device checkbox" verification', function () {
    // Open the Evernorth HK application.
    // Click on the Login button.
    // Enter the registered Email ID and click Continue button.
    // Enter the password.
    // To verify the 'Remember this device' checkbox
    // Verify that the remember device checkbox is initially unchecked.
    // Verify that checking the remember device checkbox remembers the device info.
    // Verify that unchecking the remember device checkbox removes the saved device info.
    // Click on Continue button.
    // Enter the OTP and click on the Continue button.
    // Redirected to the Evernorth HK Home screen.
  });

  it('Invalid OTP attempts verification after maximum wrong attempts', function () {
    // Open the Evernorth HK application.
    // Click on the Login button.
    // Enter the registered Email ID and click Continue button.
    // Enter the password and click Continue button.
    // Enter the wrong OTP for 10 times.
    // User should be unable to login
    // User should be blocked for one hour for maximum invalid OTP Attempts.
  });

  it('Verification for invalid email and password verification after maximum wrong attempts', function () {
    // Open the Evernorth HK application.
    // Click on the Login button.
    // Enter the registered Email ID and click Continue button.
    // Enter the wrong password/Email for 10 times.
    // User should be unable to login
    // User should be blocked for one hour for maximum invalid OTP Attempts.
  });
});
