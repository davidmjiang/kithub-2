require 'pandoc-ruby'

class DocConvert

  def self.docx_to_markdown( filename )
    PandocRuby.convert([ filename ], from: :docx, to: :markdown )
  end

end

