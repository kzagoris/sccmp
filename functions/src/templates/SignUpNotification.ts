const templateContent = /* html*/ `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up Notification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .email-header {
            text-align: center;
            margin-bottom: 20px;
        }

        .email-content {
            line-height: 1.5;
        }

        .email-footer {
            margin-top: 20px;
            font-size: 12px;
            color: #777;
            text-align: center;
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="email-header">
            <h1>{{appName}}: Sign Up Verification</h1>
        </div>
        <div class="email-content">
        <p>Dear {{name}},</p>,

    <p>We would like to extend a warm welcome to {{appFullName}}. We are excited to have you as a subscriber to our 
    platform, and we look forward to providing you with cutting-edge insights and developments in the field of 
    DRONE technology. </p>


    <p>As a subscriber to DRONES, you will have access to exclusive content, updates on our latest research and 
    development, as well as opportunities to engage with our experts. We believe that your subscription to DRONES 
    will provide you with valuable insights that will enhance your understanding of DRONE technology.</p>

   <p>Thank you for subscribing to {{appName}}, and we look forward to keeping you informed.</p>
            
            <p>If you have any questions or need assistance, please do not hesitate to contact our support team at
                <a href="mailto:info@{{appDomain}}">info@{{appDomain}}</a>.</p>
            <p>Click the link below to verify your email address and complete your registration.</p>
            <p><a href="{{signupLink}}">{{signupLink}}</a></p>
            <p>Best regards,</p>
            <p>The {{appName}} Team</p>
        </div>
        <div class="email-footer">
            <p>&copy; {{currentYear}} {{appName}}. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`
export default templateContent
