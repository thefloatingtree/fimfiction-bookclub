const Elements = {
    storyHeader: document.querySelector('header.title'),
    storyHeaderRating: document.querySelector('header.title')?.querySelector('a'),
    storyHeaderTitle: document.querySelector('header.title')?.querySelector('div'),
    storyBox: document.querySelector('div.story_content_box'),
    storyDetailsContainer: document.querySelector('div.story_content_box')?.children[1],
    chapters: document.querySelector('ul.chapters'),
    username: document.querySelector('nav.user_toolbar')?.querySelectorAll('a.button')[1]?.querySelector('span'),
    storyTitle: document.querySelector('header.title')?.querySelector('a.story_name'),
    storyWordCount: document.querySelector('div.chapters-footer')?.querySelector('div.word_count')?.querySelector('b'),
    loginButton: document.querySelector('ul.nav-bar-list')?.children[5]?.querySelector('a')
}

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