# Alliah Jenascia Pulan — Developer Portfolio

Responsive static portfolio with HTML, CSS and vanilla JavaScript. No dependencies, database, build process or secrets are needed.

## Local preview (Windows/XAMPP)

1. Extract `PORTFOLIO` into `C:\xampp\htdocs\PORTFOLIO`.
2. Start Apache in XAMPP, then visit http://localhost/PORTFOLIO/public/.
3. Alternatively, open `public/index.html` in a browser. The PDF and images are local files.

## Source structure

- `public/index.html`: page content, project links, skills and certifications
- `public/style.css`: responsive layout, theme, motion and accessibility preferences
- `public/app.js`: responsive navigation and project filters
- `public/assets/`: optimized portrait, project cover artwork, Cargonnect application screenshot montage, grain, favicon and public-safe résumé PDF
- `public/staticwebapp.config.json`: security headers for Azure Static Web Apps

## Deploy to Azure Static Web Apps (Free)

1. Open the PORTFOLIO root folder in VS Code, initialize Git, review files and commit. Publish to a GitHub repository named `PORTFOLIO` (private is fine). Verify that the repository includes `public/index.html`.
2. In Azure Portal create a Static Web App in the Azure for Students subscription. Resource group: `rg-portfolio`; name: `alliah-portfolio` (or an available name); plan: Free; source: GitHub; choose the PORTFOLIO repository and main branch.
3. Build preset: Custom / No framework. App location: `public`; API location: blank; output location: blank. Use deployment-token authentication if prompted.
4. After creation, check the automatically generated GitHub Actions workflow. Within the existing deploy action's `with:` mapping, set `app_location: "public"`, `api_location: ""`, `output_location: ""`, and `skip_app_build: true`. Preserve the Azure-generated deployment token secret and workflow triggers. Do not add a second workflow.
5. Open GitHub Actions, wait for a successful run, then open the URL from Azure Overview. Test all links, mobile menu and filters. Future pushes to main redeploy automatically.

Microsoft guide: https://learn.microsoft.com/azure/static-web-apps/get-started-portal

## Notes before publishing

- Review the portrait, public email and résumé. Phone and age were redacted from the supplied résumé for privacy. Update the résumé whenever your CV changes.
- Project covers use original project artwork; the Cargonnect cover includes actual application screenshots from the supplied user manual. Confirm permission to publish the screenshots and artwork.
- Project URLs are those supplied by you; confirm public access in an Incognito window. Individual certificate URLs were not supplied, so the page lists credentials and links to LinkedIn rather than inventing verification URLs. Credential claims are based on your supplied details.
- Keep the existing group projects credited accurately and confirm redistribution permissions for any project artwork. Add individual roles to the project cards if needed.
- Do not publish the original private CV or application credentials.

## Version 2
The portrait is a compact editorial profile card. Theme swatches choose sage, black or plum; Auto cycles every nine seconds, pauses in hidden tabs and respects reduced motion. Manual choices persist in local storage. The Cargonnect preview pairs the public landing screen with a detail of the Metro Manila disruption map. Confirm permission to share the screenshots before public deployment.

## V3 retro edition
Burgundy, midnight and espresso themes; animated vinyl, ticker and portrait. Use the pause control to stop decorative motion and automatic theme cycling. Existing Azure settings are unchanged.

## V4 typography and credential icons
Refined typography uses native system fonts (Trebuchet MS/Segoe UI/Arial for the hero, Georgia for headings), with normal or gently opened letter spacing. Navigation uses a plain-text name instead of the AP monogram. Certification issuer graphics are local SVGs from Simple Icons; the IBM mark is from the historical Simple Icons IBM icon (https://git.mibew.org/Mibew/simple-icons/commit/4b1703e133912051e4c61ae42a76a194e7667491). See https://simpleicons.org/ and https://github.com/simple-icons/simple-icons for source and usage. Brand marks identify issuers, not an endorsement or individual credential badge. All marks remain their respective owners’ trademarks. No external font or logo requests are required.

## Signature sleeve edition
The square, full-bleed record-shop signature cover opens the album. Click it or use the flip button to view School, After Dark and Peace Signs, then return to the cover. All three inside pages use a matching 4:3 photo area. The navigation record and hero record share a rotation, follow the pause control, and respect reduced motion. Bookman and Z003 are bundled locally, with their license in `public/assets/fonts/LICENSE.txt`.
