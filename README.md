# MOAT
Web Browser Security

Moat Security is a Google Chrome extension that helps to secure users' online services. Moat is designed for sites that require a username and password login, such as Facebook or Amazon. This extension protects sites that use a 'Remember Me' feature by prompting the user for a 4-digit PIN when they attempt to access a site that the original user has selected for Moat to protect. Entering this PIN makes it easy for users to secure their sites without having to explicitly log out of their services.

manifest.json  - tells Chrome everything it needs to know to properly load extension
popup.html     - UI code
popup.js       - Logic script run when the extension is opened
shield.png     - icon for the extension
shield-big.png - larger image 
Moat.pdf       - design for Webpage where user is redirected by the extension
