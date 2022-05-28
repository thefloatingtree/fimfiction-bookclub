import { getElementsFromXPathObject } from "./util";

const Elements = getElementsFromXPathObject({
    storyHeader: "/html/body/div[1]/div[1]/div[4]/div/div[4]/div/div[2]/article/div[2]/header",
    storyHeaderRating: "/html/body/div[1]/div[1]/div[4]/div/div[4]/div/div[2]/article/div[2]/header/a",
    storyHeaderTitle: "/html/body/div[1]/div[1]/div[4]/div/div[4]/div/div[2]/article/div[2]/header/div",
    storyDetailsContainer: "/html/body/div[1]/div[1]/div[4]/div/div[4]/div/div[2]/article/div[2]/div",
    storyBox: "/html/body/div[1]/div[1]/div[4]/div/div[4]/div/div[2]/article/div[2]",
    chapters: "/html/body/div[1]/div[1]/div[4]/div/div[4]/div/div[2]/article/div[2]/div[1]/form/ul",
    username: "/html/body/div[1]/div[1]/div[1]/nav/ul/li[2]/a/span",
    storyTitle: "/html/body/div[1]/div[1]/div[4]/div/div[4]/div/div[2]/article/div[2]/header/div/a",
    storyWordCount: "/html/body/div[1]/div[1]/div[4]/div/div[4]/div/div[2]/article/div[2]/div/form/div[1]/div/b",
    loginButton: "/html/body/div[1]/div[1]/div[1]/div/div[2]/ul/li[6]/a"
})


function injectBookclubButton() {
    const bookclubButton = document.createElement('button')
    const headerWrapper = document.createElement('div')
    headerWrapper.appendChild(Elements.storyHeaderRating)
    headerWrapper.appendChild(Elements.storyHeaderTitle)
    Elements.storyHeader.appendChild(headerWrapper)
    Elements.storyHeader.appendChild(bookclubButton)

    bookclubButton.innerText = "🦄 Bookclub"
    bookclubButton.classList = "styled_button styled_button_blue"
    bookclubButton.style.margin = "0"
    bookclubButton.style.whiteSpace = "nowrap"
    bookclubButton.toggled = false

    Elements.storyHeaderTitle.style.marginLeft = "-0.21rem"
    Elements.storyHeader.style.display = "flex"
    Elements.storyHeader.style.alignItems = "center"
    Elements.storyHeader.style.justifyContent = "space-between"

    return bookclubButton
}

function injectSvelteOutlet() {
    const outlet = document.createElement('div')
    outlet.id = "bookclub-svelte-root"
    outlet.classList = "tw-h-0 tw-overflow-hidden tw-opacity-0 tw-transition-opacity"

    Elements.storyBox.appendChild(outlet)

    return outlet
}

function showBookclub() {
    Elements.bookclubButton.innerText = "🦄 Back"
    Elements.storyDetailsContainer.classList.add("hidden")
    Elements.svelteOutlet.classList = "padding tw-h-auto tw-opacity-100 tw-transition-opacity"
    Elements.bookclubButton.toggled = true
}

function hideBookclub() {
    Elements.bookclubButton.innerText = "🦄 Bookclub"
    Elements.storyDetailsContainer.classList.remove("hidden")
    Elements.svelteOutlet.classList = "tw-h-0 tw-overflow-hidden tw-opacity-0 tw-transition-opacity"
    Elements.bookclubButton.toggled = false
}

export function getChapters() {
    return Array.from(Elements.chapters.children).filter(li => li.hasAttribute('data-published')).map(li => {
        const [checkboxElement, titleElement, wordCountElement] = Array.from(li.lastElementChild.children)

        const complete = checkboxElement.classList.contains("chapter-read")
        const title = titleElement.firstElementChild.innerText
        const url = titleElement.firstElementChild.href
        const wordCount = parseInt(wordCountElement.firstElementChild.innerText.trim().replace(',', ''))

        return { complete, title, wordCount, url }
    })
}

export function getFimfictionUsername() {
    return Elements.username.innerText.replace(' ▼', '').toLowerCase()
}

export function getStoryName() {
    return {
        id: window.location.pathname.match("(?!\/)[0-9]+(?=\/)")[0],
        title: Elements.storyTitle?.innerText
    }
}

export function getStoryWordCount() {
    return parseInt(Elements.storyWordCount.innerText.trim().replace(',', ''))
}

export function isLoggedIntoFimfiction() {
    return Elements.loginButton.classList.contains("notifications-link")
}

export default function initStoryPage() {
    Elements.svelteOutlet = injectSvelteOutlet()
    Elements.bookclubButton = injectBookclubButton()

    Elements.bookclubButton.addEventListener('click', () => {
        if (Elements.bookclubButton.toggled) {
            hideBookclub()
        } else {
            showBookclub()
        }
    })

    return Elements.svelteOutlet
}