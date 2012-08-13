//
//  ViewController.h
//  testApp
//
//  Created by Lucy Hutcheson on 8/12/12.
//  Copyright (c) 2012 Pure Light Designs. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ViewController : UIViewController
{

}

- (int)Add:(NSInteger)addOne addTwo:(NSInteger)addTwo;
- (BOOL)Compare:(NSInteger)compareOne compareTwo:(NSInteger)compareTwo;
- (NSString *)Append:(NSString *)stringOne stringTwo:(NSString *)stringTwo;
- (void)DisplayAlertWithString:(NSString *)alertString;


@end
