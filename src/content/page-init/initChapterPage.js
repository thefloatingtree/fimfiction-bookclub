import { activeParagraphIndex, activeParagraphText } from "../chapter-page/store/activeParagraph";

const Elements = {
    paragraphOptions: document.querySelector('div.paragraph-options')?.querySelector('div.button-group'),
    paragraphOptionsWrapper: document.querySelector('div.paragraph-options'),
    paragraphsWrapper: document.getElementById('chapter-body')?.querySelector('div.bbcode')
}

function getChildElementIndex(node) {
    return Array.prototype.indexOf.call(node.parentNode.children, node);
  }

function injectNoteButton() {
    const noteButton = document.createElement('a')
    Elements.paragraphOptions.insertBefore(noteButton, Elements.paragraphOptions.firstChild)

    noteButton.innerText = "🦄 Add Note"
    noteButton.classList = "styled_button styled_button_dark_grey"

    return noteButton
}

function injectSvelteOutlet() {
    const outlet = document.createElement('div')
    outlet.id = "bookclub-svelte-root"
    outlet.classList = "tw-h-0 tw-overflow-hidden tw-opacity-0 tw-transition-opacity"

    Elements.paragraphOptions.appendChild(outlet)

    return outlet
}

function showAddNote() {
    Elements.noteButton.innerText = "🦄 Cancel"
    Elements.svelteOutlet.classList = "tw-h-auto tw-opacity-100 tw-transition-opacity"
    Elements.noteButton.toggled = true
}

function hideAddNote() {
    Elements.noteButton.innerText = "🦄 Add Note"
    Elements.svelteOutlet.classList = "tw-h-0 tw-overflow-hidden tw-opacity-0 tw-transition-opacity"
    Elements.noteButton.toggled = false
}

export function isChapterPage() {
    const isMatch = window.location.pathname.match("\/story\/[0-9]+\/[0-9]*\/.*\/.*")
    return !!isMatch
}

export function getChapter() {

    const pathList = window.location.pathname.split('/')

    console.log({ id: parseInt(pathList[3]), title: pathList[5] })

    return {
        id: parseInt(pathList[3]),
        title: pathList[5]
    }
}

export default function initChapterPage() {
    Elements.svelteOutlet = injectSvelteOutlet()
    Elements.noteButton = injectNoteButton()

    getChapter()

    Elements.noteButton.addEventListener('click', () => {
        if (Elements.noteButton.toggled) {
            hideAddNote()
        } else {
            showAddNote()
        }
    })

    Elements.paragraphsWrapper.addEventListener('click', (e) => {
        const element = e.target.tagName === 'P' ? e.target : e.target.parentElement
        Elements.paragraphOptionsWrapper.selectedParagraphIndex = getChildElementIndex(element)
    })

    const test = new MutationObserver(() => {
        const index = Elements.paragraphOptionsWrapper.selectedParagraphIndex
        const element = Elements.paragraphsWrapper.children[index]
        const text = element.innerText

        activeParagraphIndex.set(index)
        activeParagraphText.set(text)
    })
    test.observe(Elements.paragraphOptionsWrapper, { attributes: true })


    return Elements.svelteOutlet
}