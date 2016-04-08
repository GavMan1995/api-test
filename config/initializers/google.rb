if Rails.env.development?
  config = "#{Rails.root}/config/google.yml"
  if File.exists? config
    google = YAML.load_file(config)
    google.each { |key, value| ENV[key] = value.to_s }
  else
    raise "Missing file google.yml"
  end
end
