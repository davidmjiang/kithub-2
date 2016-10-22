require 'pandoc-ruby'
# require 'tempfile'

class DocConvert

  def self.docx_to_markdown( filename )
    puts '*************' + filename + '*************'
    p filename
    PandocRuby.convert([ filename ], from: :docx, to: :markdown )
  end

  # def to_markdown(docx_filename)
  #   # takes in a stream from an upload (or a file?)
  #   # saves it as a tempfile
  #   # gets converted version
  #   # returns converted version

  #   # input = File.new('test.docx', "r")
  #   # output = Tempfile.new(['lesson', '.docx'])
  #   # begin
      
  #   # ensure
  #   #   output.close
  #   #   output.unlink
  #   # end
  # end

end

