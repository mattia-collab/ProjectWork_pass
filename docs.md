
# Password Utility Tool: Documentation
Written by Andrea Croci Angelini.

# Overview
### What is **Password Utility Tool**?
**Password Utility Tool** is a simple password generation and analisys software
that allows you to create, check secure passwords with various methods, and
compliant with various different security requirements.

### Are my password generated **locally**?
While this software takes the appearence of a webpage, it is a simple static
front-end page. There is no actual data being sent trough the network, besides
the first 5 digits of the SHA-1 of the password, that is being sent to the 
[```haveibeenpwned```](https://haveibeenpwned.com/) API when checking for
existing breaches.

### Is it safe to use

# Installation
Installing is as simple as just downloading the source from the git repo.

### Install using git
1. Create a folder for **Password Utility Tool**
2. Run ```git clone https://github.com/mattia-collab/ProjectWork_pass.git```
3. Open ```index.html``` in any modern browser

### Install from the source zip
1. Create a folder for **Password Utility Tool**
2. Download the source zip from the github repo
   ```https://github.com/mattia-collab/ProjectWork_pass#```
3. Extract the source code
4. Open ```index.html``` in any modern browser

# Features
## 1. Password generator
This feature allows you to generate completely random password. The password
is generated using a cryptographically secure pseudo-random number generator. 
This makes sure the random seed has enough entropy to be safe.

The character set used for generating the password consists of a total of 85
different unique character, including lowerase and uppercase letters, numbers
and symbols. Any password that uses at least 10 characters from the entire 
set of characters would take more than tens of thousands of years(**1**) to
crack with a brute force algorithm.

We suggest using a password length of 14 or more to ensure your password is
virtually impossible to crack.

(**1**) calculated for 10m checks per second.

### Usage
First select the length of the password. Then you can select one or more character sets
that will be used while generating.
The choices are the following:
- Uppercase letters.
- Lowercase letters.
- Numbers.
- Symbols.

### 2. Passphrase generator
This feature allows you to generate a random passphrase. A passphrase is a
secret string where instead of  

### 3. Domain Passwords
### 4. Password tester