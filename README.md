# Chirpy Starter

[![Gem Version](https://img.shields.io/gem/v/jekyll-theme-chirpy)][gem]&nbsp;
[![GitHub license](https://img.shields.io/github/license/cotes2020/chirpy-starter.svg?color=blue)][mit]

When installing the [**Chirpy**][chirpy] theme through [RubyGems.org][gem], Jekyll can only read files in the folders
`_data`, `_layouts`, `_includes`, `_sass` and `assets`, as well as a small part of options of the `_config.yml` file
from the theme's gem. If you have ever installed this theme gem, you can use the command
`bundle info --path jekyll-theme-chirpy` to locate these files.

The Jekyll team claims that this is to leave the ball in the user's court, but this also results in users not being
able to enjoy the out-of-the-box experience when using feature-rich themes.

To fully use all the features of **Chirpy**, you need to copy the other critical files from the theme's gem to your
Jekyll site. The following is a list of targets:

```shell
.
├── _config.yml
├── _plugins
├── _tabs
└── index.html
```

To save you time, and also in case you lose some files while copying, we extract those files/configurations of the
latest version of the **Chirpy** theme and the [CD][CD] workflow to here, so that you can start writing in minutes.

## Usage

Check out the [theme's docs](https://github.com/cotes2020/jekyll-theme-chirpy/wiki).

## Jekyll Compose Commands

This site uses [Jekyll Compose](https://github.com/jekyll/jekyll-compose) for easy content creation. Here are the most commonly used commands:

### Posts
```bash
# Create a new post
bundle exec jekyll post "My New Post"

# Create a new post with a specific date
bundle exec jekyll post "My New Post" --date 2024-01-15

# Create a new post with timestamp
bundle exec jekyll post "My New Post" --timestamp
```

### Drafts
```bash
# Create a new draft
bundle exec jekyll draft "My Draft Post"

# Publish a draft (moves from _drafts to _posts)
bundle exec jekyll publish _drafts/my-draft-post.md

# Publish a draft with a specific date
bundle exec jekyll publish _drafts/my-draft-post.md --date 2024-01-15

# Unpublish a post (moves from _posts to _drafts)
bundle exec jekyll unpublish _posts/2024-01-15-my-post.md
```

### Pages
```bash
# Create a new page
bundle exec jekyll page "About"

# Create a new page in a subdirectory
bundle exec jekyll page "contact/index"
```

### Serve with Drafts
```bash
# Serve the site including drafts
bundle exec jekyll serve --drafts
```

## Contributing

This repository is automatically updated with new releases from the theme repository. If you encounter any issues or want to contribute to its improvement, please visit the [theme repository][chirpy] to provide feedback.

## License

This work is published under [MIT][mit] License.

[gem]: https://rubygems.org/gems/jekyll-theme-chirpy
[chirpy]: https://github.com/cotes2020/jekyll-theme-chirpy/
[CD]: https://en.wikipedia.org/wiki/Continuous_deployment
[mit]: https://github.com/cotes2020/chirpy-starter/blob/master/LICENSE
