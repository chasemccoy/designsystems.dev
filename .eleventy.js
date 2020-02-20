module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('styles.css')
  eleventyConfig.addPassthroughCopy('js')
}
