json.extract! body_model, :id, :body_file, :tp, :created_at, :updated_at
json.url body_model_url(body_model, format: :json)
