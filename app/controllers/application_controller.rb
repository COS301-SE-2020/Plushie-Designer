class ApplicationController < ActionController::Base
    def nothing
        render text: '', content_type: 'text/plain'
    end
end
