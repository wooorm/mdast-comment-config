import {commentMarker} from 'mdast-comment-marker'

var warningIssued

// Modify remark to read configuration from comments.
export default function remarkCommentConfig() {
  var data = this.data()

  // Old remark.
  /* c8 ignore next 11 */
  if (
    !warningIssued &&
    this.Compiler &&
    this.Compiler.prototype &&
    this.Compiler.prototype.visitors
  ) {
    warningIssued = true
    console.warn(
      '[remark-comment-config] Warning: please upgrade to remark 13 to use this plugin'
    )
  }

  // Other extensions.
  /* c8 ignore next */
  if (!data.toMarkdownExtensions) data.toMarkdownExtensions = []

  data.toMarkdownExtensions.push({handlers: {html: commentConfigHtml}})

  function commentConfigHtml(node) {
    var marker = commentMarker(node)

    if (marker && marker.name === 'remark') {
      Object.assign(this.options, marker.parameters)
    }

    // Like the source:
    // <https://github.com/syntax-tree/mdast-util-to-markdown/blob/e40e015/lib/handle/html.js#L4>
    return node.value || ''
  }
}
