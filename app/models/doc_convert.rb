require 'pandoc-ruby'
require 'tempfile'

class DocConvert

  def self.docx_to_markdown( filename )
    PandocRuby.convert([ filename ], from: :docx, to: :markdown )
  end

  def self.markdown_to_rtf( markdown_string, title )
    puts markdown_string
    f = PandocRuby.convert(markdown_string, :s, {from: :markdown, to: :docx, o: 'output.docx'})
    file = Tempfile.new(["#{title}", ".doc"])
    File.open(file.path, 'wb'){|file| file.write(f)}
    file.rewind
    file.path
  end

  def self.add_headers_to_markdown(lesson)
    new_content = lesson.content
    header_parts = ["# #{lesson.title}\n","Powered by [Kithub](https://gentle-retreat-33093.herokuapp.com)\n","* Author: #{lesson.teacher.first_name} #{lesson.teacher.last_name}","* Estimated Time (in hrs): #{lesson.hours}","* State: #{lesson.state}","* Grade: #{lesson.grade}","* Subject: #{lesson.subject}","* Lesson Type: #{lesson.lesson_type}"];
    header = header_parts.join("\n");
    header + "\n\n" + new_content
  end

end

