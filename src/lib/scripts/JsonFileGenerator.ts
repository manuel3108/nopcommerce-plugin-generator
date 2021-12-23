import { File } from './common/File';
import { Intend } from '../csharp/common/Defaults';

export class JsonFileGenerator {
	static generatePluginsJson(): File {
		return new File(
			'plugins',
			'json',
			['test'],
			JSON.stringify(
				{
					Group: 'Discount requirements',
					FriendlyName: 'Must be assigned to customer role',
					SystemName: 'DiscountRequirement.MustBeAssignedToCustomerRole',
					Version: '1.39',
					SupportedVersions: ['4.50'],
					Author: 'nopCommerce team',
					DisplayOrder: 1,
					FileName: 'Nop.Plugin.DiscountRules.CustomerRoles.dll',
					Description:
						'This plugin allows you to configure discounts for certain customer groups (roles)'
				},
				null,
				Intend
			)
		);
	}

	static generatePluginsJson2(): File {
		return new File(
			'asd',
			'json',
			['test'],
			JSON.stringify(
				{
					Group: 'Discount requirements',
					FriendlyName: 'Must be assigned to customer role',
					SystemName: 'DiscountRequirement.MustBeAssignedToCustomerRole',
					Version: '1.39',
					SupportedVersions: ['4.50'],
					Author: 'nopCommerce team',
					DisplayOrder: 1,
					FileName: 'Nop.Plugin.DiscountRules.CustomerRoles.dll',
					Description:
						'This plugin allows you to configure discounts for certain customer groups (roles)'
				},
				null,
				Intend
			)
		);
	}
}
