import "./tailwind.css";
import StoryApp from './story-page/App.svelte'
import ChapterApp from './chapter-page/App.svelte'
import initStoryPage from "./page-init/initStoryPage";
import initChapterPage, { isChapterPage } from "./page-init/initChapterPage";

console.log("🦄 fimfiction bookclub started");

isChapterPage() ? 
new ChapterApp({
    target: initChapterPage()
}) : 
new StoryApp({
    target: initStoryPage()
})

