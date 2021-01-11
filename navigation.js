'use strict'

module.exports = {
  Introduction: {
    slug: 'introduction',
    sections: {
      'About Supercharge': 'about-supercharge',
      Contribute: 'contribute'
      // 'Upgrade Guide': 'upgrade'
    }
  },

  'Getting Started': {
    slug: 'getting-started',
    sections: {
      Installation: 'installation',
      'Configuration & Env': 'configuration',
      'Directory Structure': 'directory-structure',
      Application: 'application',
      Development: 'development',
      Deployment: 'deployment',
      'Service Providers': 'service-providers'
    }
  },

  Essentials: {
    slug: 'essentials',
    sections: {
      Routing: 'routing',
      Requests: 'requests',
      Responses: 'responses',
      Middleware: 'middleware',
      // 'CSRF Protection': 'csrf-protection',
      'App Lifecycle': 'app-lifecycle',
      'Request Lifecycle': 'request-lifecycle'
      // Authentication: 'authentication',
      // Authorization: 'authorization',
      // Validation: 'validation'
    }
  },

  Views: {
    slug: 'views',
    sections: {
      Views: 'views',
      Assets: 'frontend-assets',
      Handlebars: 'handlebars',
      'Built-in Helpers': 'handlebars-helpers'
    }
  },

  Amplifier: {
    slug: 'amplifier',
    sections: {
      'Craft CLI': 'craft-cli',
      // Mailer: 'mailer',
      Filesystem: 'filesystem',
      // Hashing: 'hashing',
      // Encryption: 'encryption',
      // Events: 'events',
      Logger: 'logger'
      // Session: 'session',
      // Queues: 'queues'
    }
  },

  Packages: {
    slug: 'packages',
    sections: {
      Strings: 'strings',
      'Promise Pool': 'promise-pool',
      Collections: 'collections',
      Map: 'map',
      Set: 'set',
      Streams: 'streams',
      Goodies: 'goodies'
      // Numbers: 'numbers'
    }
  }

  // Database: {
  //   slug: 'database',
  //   sections: {
  //     Connectors: 'database-connectors',
  //     Pagination: 'pagination'
  //   }
  // },

  // Testing: {
  //   slug: 'testing',
  //   sections: {
  //     'Getting Started': 'testing',
  //     'Create & Debug Tests': 'create-and-debug-tests',
  //     'HTTP Tests': 'http-tests',
  //     Fakes: 'testing-fakes',
  //     Database: 'database-testing'
  //   }
  // },
}
