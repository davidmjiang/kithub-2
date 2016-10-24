require 'pandoc-ruby'

class DocConvert

  def self.docx_to_markdown( filename )
    PandocRuby.convert([ filename ], from: :docx, to: :markdown )
  end

  def self.markdown_to_rtf( markdown_string )
    puts markdown_string
    PandocRuby.convert(markdown_string, :s, {from: :markdown, to: :rtf, o: 'output.rtf'})
  end

  def self.add_headers_to_markdown(lesson)
    new_content = lesson.content
    header = "# #{lesson.title}\n* Estimated Time: #{lesson.hours}\n"
    header + new_content
  end

end

