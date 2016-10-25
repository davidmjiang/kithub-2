require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module KitHub
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Allow Devis to respond with JSON
    config.active_record.schema_format = :sql
    config.to_prepare do
      DeviseController.respond_to :html, :json
    end

    config.generators do |g|
      g.test_framework  nil #to skip test framework
      g.assets  false #to skip automatic javascript
      g.helper false #to skip automatic helper files
      g.stylesheets false #to skip automatic stylesheets
    end

  end
end
