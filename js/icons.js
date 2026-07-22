var _icons = {
  home:'🏠', 'traffic-light':'🚦', shield:'🛡️', pin:'📍', user:'👤',
  wave:'👋', trophy:'🏆', lightbulb:'💡', star:'⭐', check:'✅',
  warning:'⚠️', emergency:'🆘', chat:'💬', phone:'📞', map:'🗺️',
  lock:'🔒', 'arrow-left':'⬅️', heart:'❤️', bookmark:'🔖', share:'🔗',
  camera:'📷', celebration:'🎉', 'thumbs-up':'👍', muscle:'💪',
  medal:'🏅', video:'▶️', book:'📖', car:'🚗', smoking:'🚬',
  pills:'💊', target:'🎯', sun:'☀️', moon:'🌙', door:'🚪',
  'gold-medal':'🥇', 'empty-mail':'📭', write:'✍️', info:'ℹ️',
  'no-stopping':'⛔', 'road-work':'🚧', stop:'🛑', music:'🎵',
  'emergency-phone':'📱', 'no-entry':'🚫', pedestrian:'🚶',
  parking:'🅿️', bicycle:'🚲', hospital:'🏥', fuel:'⛽',
  restaurant:'🍽️', 'book-open':'📖', trash:'🗑️', police:'👮',
  'no-pedestrians':'🚷', yield:'✋', 'slippery':'🧊',
  roundabout:'🔄', tram:'🚊', bridge:'🌉', bus:'🚌'
};
function icon(name, size) {
  return '<span class="emoji-icon" style="font-size:' + (size||24) + 'px">' + (_icons[name]||'❓') + '</span>';
}
