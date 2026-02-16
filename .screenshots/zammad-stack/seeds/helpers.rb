module SeedHelpers
  def self.set_avatar_for_user(login:, file:)
    user = User.find_by(login:)
    file = File.open("#{__dir__}/#{file}", 'rb')
    contents = file.read
    avatar = Avatar.add(
      object:        'User',
      o_id:          user.id,
      default:       true,
      resize:        {
        content:   contents,
        mime_type: 'image/jpg',
      },
      source:        'web',
      deletable:     true,
      updated_by_id: 1,
      created_by_id: 1,
    )
    Avatar.set_default('User', user.id, avatar.id)
    user.update(image: avatar.store_hash)
  end

  def self.set_setting_without_validation(name:, value:)
    setting = Setting.find_by(name:)
    setting.state_current = { 'value' => value }
    setting.save!(validate: false)
    Rails.logger.info("Setting.set('#{name}', #{value})")
  end
end
