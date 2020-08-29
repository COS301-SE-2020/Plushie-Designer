require "administrate/base_dashboard"

class ToyDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    user: Field::BelongsTo,
    ratings: Field::HasMany,
    id: Field::Number,
    name: Field::String,
    head: Field::Number,
    arms: Field::Number,
    torso: Field::Number,
    legs: Field::Number,
    rating: Field::String.with_options(searchable: false),
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
    head_pos: Field::Number.with_options(decimals: 2),
    head_posx: Field::Number.with_options(decimals: 2),
    torso_posy: Field::Number.with_options(decimals: 2),
    torso_posx: Field::Number.with_options(decimals: 2),
    larm_posy: Field::Number.with_options(decimals: 2),
    larm_posx: Field::Number.with_options(decimals: 2),
    rarm_posy: Field::Number.with_options(decimals: 2),
    rarm_posx: Field::Number.with_options(decimals: 2),
    lleg_posy: Field::Number.with_options(decimals: 2),
    lleg_posx: Field::Number.with_options(decimals: 2),
    rleg_posy: Field::Number.with_options(decimals: 2),
    rleg_posx: Field::Number.with_options(decimals: 2),
    image: Field::Text,
    head_posz: Field::Number.with_options(decimals: 2),
    torso_posz: Field::Number.with_options(decimals: 2),
    larm_posz: Field::Number.with_options(decimals: 2),
    rarm_posz: Field::Number.with_options(decimals: 2),
    lleg_posz: Field::Number.with_options(decimals: 2),
    rleg_posz: Field::Number.with_options(decimals: 2),
    head_uv: Field::Text,
    torso_uv: Field::Text,
    larm_uv: Field::Text,
    rarm_uv: Field::Text,
    lleg_uv: Field::Text,
    rleg_uv: Field::Text,
    shared: Field::Boolean,
  }.freeze

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = %i[
  user
  ratings
  id
  name
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = %i[
  user
  ratings
  id
  name
  head
  arms
  torso
  legs
  rating
  created_at
  updated_at
  head_pos
  head_posx
  torso_posy
  torso_posx
  larm_posy
  larm_posx
  rarm_posy
  rarm_posx
  lleg_posy
  lleg_posx
  rleg_posy
  rleg_posx
  image
  head_posz
  torso_posz
  larm_posz
  rarm_posz
  lleg_posz
  rleg_posz
  head_uv
  torso_uv
  larm_uv
  rarm_uv
  lleg_uv
  rleg_uv
  shared
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = %i[
  user
  ratings
  name
  head
  arms
  torso
  legs
  rating
  head_pos
  head_posx
  torso_posy
  torso_posx
  larm_posy
  larm_posx
  rarm_posy
  rarm_posx
  lleg_posy
  lleg_posx
  rleg_posy
  rleg_posx
  image
  head_posz
  torso_posz
  larm_posz
  rarm_posz
  lleg_posz
  rleg_posz
  head_uv
  torso_uv
  larm_uv
  rarm_uv
  lleg_uv
  rleg_uv
  shared
  ].freeze

  # COLLECTION_FILTERS
  # a hash that defines filters that can be used while searching via the search
  # field of the dashboard.
  #
  # For example to add an option to search for open resources by typing "open:"
  # in the search field:
  #
  #   COLLECTION_FILTERS = {
  #     open: ->(resources) { resources.where(open: true) }
  #   }.freeze
  COLLECTION_FILTERS = {}.freeze

  # Overwrite this method to customize how toys are displayed
  # across all pages of the admin dashboard.
  #
  # def display_resource(toy)
  #   "Toy ##{toy.id}"
  # end
end
