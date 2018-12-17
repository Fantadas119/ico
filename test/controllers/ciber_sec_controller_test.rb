require 'test_helper'

class CiberSecControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get ciber_sec_index_url
    assert_response :success
  end

end
