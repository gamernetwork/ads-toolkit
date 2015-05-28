from googleads import dfp
from googleads import oauth2
from datetime import date

SERVICE_ACCOUNT_EMAIL = ''
KEY_FILE = ''
APPLICATION_NAME = 'test'
NETWORK = ''


class DFPHandler():
	def __init__(self, service_account_email, key_file, application_name):
		oauth2_client = oauth2.GoogleServiceAccountClient(
			oauth2.GetAPIScope('dfp'), service_account_email, key_file)

		self.dfp_client = dfp.DfpClient(oauth2_client, application_name, NETWORK)
		self.custom_targeting_service = self.dfp_client.GetService('CustomTargetingService', version='v201505')

		self.search_for_order(raw_input("Search for the order: "))


	def search_for_order(self, search_term):
		order_service = self.dfp_client.GetService('OrderService', version='v201505')
		statement = dfp.FilterStatement("WHERE name LIKE '" + search_term + "'")

		# Get ad units by statement.
		response = order_service.getOrdersByStatement(
			statement.ToStatement())
		if 'results' in response:
			# Display results.
			for order in response['results']:
				print ('Line Item with ID \'%s\' and name \'%s\' was found.'
					   % (order['id'], order['name']))
			statement.offset += dfp.SUGGESTED_PAGE_LIMIT

		print '\nNumber of results found: %s' % response['totalResultSetSize']

		answer = raw_input("Enter order ID to use this line item or type search to look again: ")

		if answer == "search":
			self.search_for_order(raw_input("Search for the order: "))
		else:
			for order in response['results']:
				if order['id'] == long(answer):
					self.advertiserId = order['advertiserId']
					self.create_line_item(answer)

	def create_line_item(self, order_id):
		targets = [6699484, 6656764, 6717244]
		print("0: 6699484 - RPS Takeover")
		print("1: 6656764 - Eurogamer.net Takeover")
		print("2: 6717244 - EG.net TESTING")
		site = int(raw_input("Which site do you want to target? 0, 1 or 2: "))
		if site > 2 and site < 0:
			self.create_line_item(order_id)
			return
		target = targets[site]
		url = raw_input("From Which URL do you want to target? Example - /page/93/: ")
		line_item_service = self.dfp_client.GetService('LineItemService', version='v201505')

		url_criteria = {
			'xsi_type': 'CustomCriteria',
			'keyId': '387844',
			'operator': 'IS',
			'valueIds': [self.find_key_value(387844, url)]
		}

		line_item = {
			'name': raw_input("Enter a line item name: "),
			'orderId': str(order_id),
			'targeting': {
				'inventoryTargeting': {
					'targetedPlacementIds': target
				},
				'customTargeting': {
					'xsi_type': 'CustomCriteriaSet',
					'logicalOperator': 'OR',
					'children': [url_criteria]
				}
			},
			'creativePlaceholders': [
				{
					'size': {
						'width': '300',
						'height': '600'
					}
				},
				{
					'size': {
						'width': '1260',
						'height': '110'
					}
				}
			],
			'startDateTimeType': 'IMMEDIATELY',
			'lineItemType': 'SPONSORSHIP',
			'endDateTime': {
				'date': {
					'year': str(date.today().year),
					'month': str(date.today().month + 1),
					'day': str(date.today().day)
				},
				'hour': '0',
				'minute': '0',
				'second': '0',
				'timeZoneID': 'America/Los_Angeles'
			},
			'costType': 'CPD',
			'costPerUnit': {
				'currencyCode': 'GBP',
				'microAmount': '0'
			},
			'primaryGoal': {
				'goalType': 'DAILY',
				'unitType': 'IMPRESSIONS',
				'units': '100'
			},
			'creativeRotationType': 'OPTIMIZED',
			'discountType': 'ABSOLUTE_VALUE',
			'allowOverbook': 'true'
		}

		line_items = []
		line_items.append(line_item)

		line_items = line_item_service.createLineItems(line_items)

		creative_ids = self.make_creatives()
		lica_service = self.dfp_client.GetService('LineItemCreativeAssociationService', version='v201505')

		licas = []
		for creative_id in creative_ids:
			licas.append({'creativeId': creative_id, 'lineItemId': line_items[0]['id']})

		lica_service.createLineItemCreativeAssociations(licas)
		print("New line item successfully created!")

	def make_creatives(self):
		creative_service = self.dfp_client.GetService('CreativeService', version='v201505')
		advertiser_id = self.advertiserId

		# Create custom creative.
		portrait_creative = {
			'xsi_type': 'CustomCreative',
			'name': 'Portrait Creative',
			'advertiserId': advertiser_id,
			'size': {'width': '300', 'height': '600'},
			'htmlSnippet': "<html><head><body></body></head></html>"
		}

		leaderboard_creative = {
			'xsi_type': 'CustomCreative',
			'name': 'Leaderboard Creative',
			'advertiserId': advertiser_id,
			'size': {'width': '1260', 'height': '110'},
			'htmlSnippet': "<html><head><body></body></head></html>"
		}

		creatives = creative_service.createCreatives([portrait_creative, leaderboard_creative])
		creative_ids = []
		for creative in creatives:
			creative_ids.append(creative['id'])
		return creative_ids

	def find_key_value(self, key, url):
		statement = dfp.FilterStatement("WHERE customTargetingKeyId = " + str(key) + " AND name = '" + url + "'")

		# Get ad units by statement.
		response = self.custom_targeting_service.getCustomTargetingValuesByStatement(statement.ToStatement())
		if 'results' in response:
			for value in response['results']:
				return value['id']
		else:
			return self.create_key_value(key, url)

	def create_key_value(self, key, url):
		values = [
			{
				'customTargetingKeyId': key,
				'displayName': url,
				'name': url,
				'matchType': 'EXACT'
			}
		]
		values = self.custom_targeting_service.createCustomTargetingValues(values)
		for value in values:
			return value['id']

if __name__ == '__main__':
	DFPHandler(SERVICE_ACCOUNT_EMAIL, KEY_FILE, APPLICATION_NAME)