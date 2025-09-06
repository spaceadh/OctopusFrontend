from playwright.sync_api import sync_playwright, Page, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    try:
        # 1. Navigate to the login page.
        page.goto("http://localhost:5173/login")

        # 2. Fill in the login form.
        page.get_by_placeholder("name@example.com").fill("test@example.com")
        page.get_by_placeholder("********").fill("password123")
        page.get_by_role("button", name="Sign in").click()

        # 3. Wait for navigation to the lending page.
        page.wait_for_url("http://localhost:5173/")
        page.goto("http://localhost:5173/app/lending")
        page.wait_for_selector('[data-slot="sidebar-wrapper"]')

        # 4. Take a screenshot of the page with the sidebar expanded.
        page.screenshot(path="jules-scratch/verification/expanded_sidebar.png")

        # 5. Scroll the sidebar to the bottom to find the "Settings" button
        sidebar_content = page.locator('[data-testid="sidebar-scroll-container"]')
        sidebar_content.evaluate('node => node.scrollTop = node.scrollHeight')

        # 6. Find the "Settings" button and click it.
        settings_button = page.locator('[data-sidebar="menu-button"]:has-text("Settings")')
        settings_button.click()

        # 7. Wait for the dialog to appear and take a screenshot.
        page.wait_for_selector('[role="dialog"]')
        page.screenshot(path="jules-scratch/verification/settings_dialog.png")

        # 8. Close the dialog
        page.keyboard.press("Escape")

        # 9. Click the sidebar trigger to collapse the sidebar.
        trigger = page.locator('[data-slot="sidebar-trigger"]')
        trigger.click()

        # Wait for the transition to finish
        page.wait_for_timeout(500)

        # 10. Take another screenshot of the page with the sidebar collapsed.
        page.screenshot(path="jules-scratch/verification/collapsed_sidebar.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
