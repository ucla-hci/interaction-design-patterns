// Pattern library site. Input: src/ and ../pattern-language (through src/_data/library.js).
export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "../pattern-language/figures": "figures" });
  eleventyConfig.addWatchTarget("../pattern-language/");
  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    templateFormats: ["njk"],
    htmlTemplateEngine: "njk",
  };
}
