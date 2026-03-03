<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Create Account for Estoque Senac">

    <!-- CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>

    <title>Create Account - Estoque Senac</title>
    
    <style>
        .fixed-header {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1000;
            background-color: white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        body {
            padding-top: 180px;
        }
        
        .header-images {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 10px 0;
        }
    </style>
</head>
<body class="bg-gray-50 min-h-screen">

    <link rel="stylesheet" href="style.css">

    <!-- Header FIXO -->
    <header class="fixed-header">
        <hr style="border: none; height: 75px; background-color: rgb(6, 43, 124); margin: 0;">
        <hr style="border: none; height: 25px; background-color: rgb(250, 166, 40); margin: 0;">
        <div class="header-images">
            <img src="senac-logo-png_seeklogo-205285.png" alt="logo" class="w-16">
            <img src="2066642.png" alt="logo" class="w-8">
        </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 max-w-md mt-8 mb-20">
        <div class="bg-white border border-gray-300 rounded-lg shadow-sm p-6 md:p-8">
            <h1 class="text-3xl font-normal mb-6 text-center md:text-left" style="color: #0066C0;">
                Create Account
            </h1>

            <!-- FORMULÁRIO -->
            <form id="registrationForm" class="space-y-6">
                <!-- Username -->
                <div class="space-y-2">
                    <label for="username" class="block font-medium text-gray-700">
                        Username <span class="text-red-500">*</span>
                    </label>
                    <input type="text" 
                           id="username" 
                           name="username" 
                           required
                           placeholder="Choose a username"
                           minlength="3"
                           maxlength="30"
                           pattern="[a-zA-Z0-9_]+"
                           class="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-colors duration-200">
                    <div class="flex justify-between items-center">
                        <p class="text-xs text-gray-500">Only letters, numbers, and underscores. 3-30 characters.</p>
                        <span class="text-xs text-gray-500">Required</span>
                    </div>
                </div>

                <!-- Email -->
                <div class="space-y-2">
                    <label for="email" class="block font-medium text-gray-700">
                        Email Address <span class="text-red-500">*</span>
                    </label>
                    <input type="email" 
                           id="email" 
                           name="email" 
                           required
                           placeholder="Enter your email"
                           class="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-colors duration-200">
                </div>

                <!-- Phone -->
                <div class="space-y-2">
                    <label for="phone" class="block font-medium text-gray-700">
                        Phone Number <span class="text-red-500">*</span>
                    </label>
                    <input type="tel" 
                           id="phone" 
                           name="phone" 
                           required
                           placeholder="(11) 99999-9999"
                           pattern="\([0-9]{2}\)\s[0-9]{4,5}-[0-9]{4}"
                           class="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-colors duration-200">
                </div>

                <!-- Password -->
                <div class="space-y-2">
                    <label for="password" class="block font-medium text-gray-700">Password <span class="text-red-500">*</span></label>
                    <div class="relative">
                        <input type="password" 
                               id="password" 
                               name="password" 
                               required
                               minlength="8"
                               placeholder="Create a strong password"
                               class="w-full px-3 py-2.5 border border-gray-300 rounded-md pr-10 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-colors duration-200">
                        <button type="button" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" id="togglePassword">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                    <div id="passwordStrength" class="hidden mt-2">
                        <div class="flex items-center space-x-2">
                            <div class="h-1 flex-1 bg-gray-200 rounded-full overflow-hidden">
                                <div id="strengthBar" class="h-full w-0 transition-all duration-300"></div>
                            </div>
                            <span id="strengthText" class="text-xs font-medium"></span>
                        </div>
                    </div>
                </div>

                <!-- Confirm Password -->
                <div class="space-y-2">
                    <label for="confirmPassword" class="block font-medium text-gray-700">Confirm Password <span class="text-red-500">*</span></label>
                    <div class="relative">
                        <input type="password" 
                               id="confirmPassword" 
                               name="confirmPassword" 
                               required
                               minlength="8"
                               placeholder="Confirm your password"
                               class="w-full px-3 py-2.5 border border-gray-300 rounded-md pr-10 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-colors duration-200">
                        <button type="button" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" id="toggleConfirmPassword">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                    <div id="passwordMatchMessage" class="text-sm mt-1"></div>
                </div>

                <!-- Submit Button -->
                <button type="button" 
                        id="submitButton" 
                        class="w-full border border-gray-400 rounded-md py-3 px-4 text-sm font-medium hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed" 
                        disabled
                        style="background-color: #FAA628; color: white;">
                    Create your Estoque Senac account
                </button>

                <!-- Result Message -->
                <div id="result" class="text-center mt-4 font-medium"></div>

            </form>
        </div>
    </main>

    <!-- RECAPTCHA V3 -->
    <script src="https://www.google.com/recaptcha/api.js?render=6LeIrn4sAAAAAEmDmijVjHsMq3t0YIwq7rD5e9FW"></script>
    <!-- Your JS -->
    <script type="module" src="./create.js"></script>
                            
</body>
</html>

