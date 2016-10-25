require 'pandoc-ruby'
require 'tempfile'

class DocConvert

  def self.docx_to_markdown( filename )
    PandocRuby.convert([ filename ], from: :docx, to: :markdown )
  end

  def self.markdown_to_rtf( markdown_string, title )
    f = PandocRuby.convert(markdown_string, :s, {from: :markdown, to: :docx, o: 'output.docx'})
    file = Tempfile.new(["#{title}", ".doc"])
    File.open(file.path, 'wb'){|file| file.write(f)}
    file.rewind
    file.path
  end

  def self.add_headers_to_markdown(lesson)
    new_content = lesson.content
    header = "# #{lesson.title}\n* Estimated Time: #{lesson.hours}\n"
    header + new_content
  end

end

