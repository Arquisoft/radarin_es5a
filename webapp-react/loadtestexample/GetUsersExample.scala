
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class GetUsersExample extends Simulation {

	val httpProtocol = http
		.baseUrl("https://www.google.com")
		.inferHtmlResources()
		.acceptHeader("*/*")
		.acceptEncodingHeader("gzip, deflate")
		.acceptLanguageHeader("en-US,en;q=0.5")
		.userAgentHeader("Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:84.0) Gecko/20100101 Firefox/84.0")

	val headers_1 = Map(
		"Accept" -> "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
		"If-Modified-Since" -> "Tue, 19 Jan 2021 11:59:09 GMT",
		"If-None-Match" -> """W/"c05-1771a834ec8"""",
		"Upgrade-Insecure-Requests" -> "1")

	val headers_2 = Map("Accept" -> "text/css,*/*;q=0.1")

	val headers_3 = Map(
		"If-Modified-Since" -> "Tue, 19 Jan 2021 11:59:09 GMT",
		"If-None-Match" -> """W/"1569-1771a834ec8"""")

	val headers_5 = Map(
		"If-Modified-Since" -> "Tue, 19 Jan 2021 11:59:09 GMT",
		"If-None-Match" -> """W/"2704a-1771a834ec8"""")

	val headers_6 = Map("Accept" -> "image/webp,*/*")

	val headers_7 = Map("Origin" -> "https://radarin0webapp.herokuapp.com")

    val uri1 = "https://radarin0webapp.herokuapp.com"
    val uri3 = "https://radarin0restapi.herokuapp.com/api/users/list"

	val scn = scenario("GetUsersExample")
		.exec(http("request_0")
			.get("/complete/search?client=firefox&q=rada")
			.resources(http("request_1")
			.get(uri1 + "/")
			.headers(headers_1),
            http("request_2")
			.get(uri1 + "/static/css/2.ae9f1eb3.chunk.css")
			.headers(headers_2),
            http("request_3")
			.get(uri1 + "/static/js/main.3a59d1c0.chunk.js")
			.headers(headers_3),
            http("request_4")
			.get(uri1 + "/static/css/main.0793e725.chunk.css")
			.headers(headers_2),
            http("request_5")
			.get(uri1 + "/static/js/2.d501b3a8.chunk.js")
			.headers(headers_5),
            http("request_6")
			.get(uri1 + "/static/media/logo.6ce24c58.svg")
			.headers(headers_6),
            http("request_7")
			.get(uri3)
			.headers(headers_7)))

	setUp(scn.inject(atOnceUsers(20))).protocols(httpProtocol)
}