## making content fit

To make the content in the body of my web app fit and not overflow in the vertical direction as to avoid scrolling for that part of the application I tried adding the following css rule

`
css
body {
  height: 100%;
  overflow: hidden;
}
`

This will ensure that the content of the body element stays within the visible area of the page and doesn't overflow causing a vertical scroll.

My problem is that now the footer of the application is hidden and I don't want that I want all of the application to fit on the page and be viewable.

Currently adjusting index.html and styles.css while working on this task.
