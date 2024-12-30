const templateContent = /* html*/ `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Notification</title>
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
            <h1>{{appName}}: Password Reset Request</h1>
        </div>
        <div class="email-content">
        <p>Dear {{name}},</p>

    <p>We have received a request to reset your password for your {{appFullName}} account.</p>

    <p>If you did not make this request, you can safely ignore this email. If this was not you,
     please consider updating your password and checking your account 
     for any suspicious activity.</p>

    <p>If you did request a password reset, please click the link below to complete the process.</p>
    
    <p><a href="{{resetLink}}">{{resetLink}}</a></p>

    <p>Remember, for your security, this link will only be active for the next hour.</p>

    <p>If you have any questions or need assistance, please do not hesitate to contact our support team at
                <a href="mailto:info@{{appDomain}}">info@{{appDomain}}</a>.</p>
            
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
