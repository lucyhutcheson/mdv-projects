//
//  AppDelegate.m
//  testApp
//
//  Created by Lucy Hutcheson on 7/30/12.
//  Copyright (c) 2012 Pure Light Designs. All rights reserved.
//

#import "AppDelegate.h"

@implementation AppDelegate

@synthesize window = _window;
@synthesize managedObjectContext = __managedObjectContext;
@synthesize managedObjectModel = __managedObjectModel;
@synthesize persistentStoreCoordinator = __persistentStoreCoordinator;

- (void)dealloc
{
    [_window release];
    [__managedObjectContext release];
    [__managedObjectModel release];
    [__persistentStoreCoordinator release];
    [super dealloc];
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    self.window = [[[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]] autorelease];
    // Override point for customization after application launch.
    self.window.backgroundColor = [UIColor whiteColor];
    [self.window makeKeyAndVisible];

    
    /*------------------------------------------------------------------------------------------------------------ *
     * STORY: Pet Salon                                                                                            *
     * I own a pet salon (hypothetically at least).  This is a story about a day in the life of the pet salon.     *
     *------------------------------------------------------------------------------------------------------------ */

    
    
    /* STEP 1:  Create New Empty Application Project =========================================================== */

    NSLog(@"Welcome to Mari's Petdigree Salon!\n");

    
    /* STEP 2:  Create a variable using a float data type. =====================================================
     *          Cast the float to an int and  using NSLog, output both the 
     *          initial float value as well as the int value.
     */
        
    // Check the number of dogs we have to wash and fix (cast) it.
    float wrongNumDogs = 9.5;               // Wrong number of dogs entered into the Dog Log
    int correctNumDogs = (int)wrongNumDogs; // Fixing (casting) the number of dogs
    
    // Log the mistake
    NSLog(@"Oops!  Looks like there was a mistake in the appointment log.  We have %d dogs to wash, not %.2f.\n", correctNumDogs, wrongNumDogs);
    

    
    /* STEP 3:  Perform an AND, OR comparison. ==================================================================
     *          Use float, int and BOOL types.
     */
    
    int workersToday = 2;           // Number of workers
    BOOL needMoreWorkers = YES;     // Do we need more workers
    BOOL haveEnoughWorkers = NO;    // Have enough workers
    
    
    // Check if we have lots of dogs and need more workers.
    if ((correctNumDogs > 10) && (needMoreWorkers == YES)) // Float and BOOL with AND operator
    {
        NSLog(@"It looks like we need more workers. %d dogs are too many for %d workers.\n", correctNumDogs, workersToday);
    }
    // Check if we have a few workers and less than ten dogs or if we have enough workers
    else if (((workersToday < 10) && ((correctNumDogs > 0) && (correctNumDogs < 10))) || (haveEnoughWorkers == YES)) 
        // Int, Float, and BOOl with AND and OR Operators
    {
        NSLog(@"It looks like we have enough workers to cover all the dogs for today.\n");
    }
    // Don't need any workers today.
    else 
    {
        NSLog(@"We have no dogs to wash today.  Let's clean up the salon!"); // Default message
    }

    
    
    /* STEP 4:  Use an if, else if, and else check using any data type ========================================== */

    BOOL cliffordIsHere = YES;  // Clifford, the big, red dog
    BOOL fifiIsHere = NO;       // Fifi, difficult dog
    
    // Check if Clifford is here or if we have enough workers.
    if ((cliffordIsHere == YES) || (workersToday < 5)) // IF statement with OR operator
    {
        NSLog(@"Uh oh!  Big Clifford is here.  Let's get our top stylist in here.");
    }
    // Check if Fifi is here and Clifford is here and sound the alarm.
    else if ((fifiIsHere == YES) && (cliffordIsHere == YES)) // ELSE IF statement with AND operator
    {
        NSLog(@"We need to bring in the big dog stylists today.  Our difficult clients are both here.");
    }
    // No need to panic.  Clifford and Fifi are not here.
    else // ELSE statement
    {
        NSLog(@"We can relax today because our biggest clients aren't here.");
    }
    
    

    /* STEP 5:  Perform a single for loop printing out values to the console ==================================== */
    
    // Time to wash the dogs we have today.
    for (int washDogs = correctNumDogs; washDogs > 0; washDogs--)
    {
        NSLog(@"Washing dog number %d.\n", washDogs);  // Start washing the dogs.
    }
    
    

    /* STEP 6:  Perform a nested loop printing out values to the console ========================================= */
    
    // Time to trim their nails.
    for (int trimDogs = correctNumDogs; trimDogs > 0; trimDogs--)
    {
        NSLog(@"Clipping the nails of dog number %d.\n", trimDogs);  // Clipping the dogs' nails.
        
        int count = 1;
        
        do // Nested loop
        {
            NSLog(@"%d nail clipped.\n", count); // Counting each nail clipped.
            
            count++; //decrement count
        } while (count < 21);
        
    }
    
    
    
    /* STEP 7:  Perform a while loop that increments an int variable and outputs to the console ===================== */
    
    // Time to style and finish up the dogs.
    while (correctNumDogs > 0)
    {
        NSLog(@"Styling and finishing up dog number %d.\n", correctNumDogs);
        correctNumDogs--;
    }
    
    NSLog(@"All done here.  It's time to go home!  Wrap it up everybody.");
    
    
    
    /*------------------------------------------------------------------------------------------------------------ *
     * End of Story                                                                                                *
     *------------------------------------------------------------------------------------------------------------ */

    
    return YES;
}

- (void)applicationWillResignActive:(UIApplication *)application
{
    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
}

- (void)applicationDidEnterBackground:(UIApplication *)application
{
    // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later. 
    // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
}

- (void)applicationWillEnterForeground:(UIApplication *)application
{
    // Called as part of the transition from the background to the inactive state; here you can undo many of the changes made on entering the background.
}

- (void)applicationDidBecomeActive:(UIApplication *)application
{
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
}

- (void)applicationWillTerminate:(UIApplication *)application
{
    // Saves changes in the application's managed object context before the application terminates.
    [self saveContext];
}

- (void)saveContext
{
    NSError *error = nil;
    NSManagedObjectContext *managedObjectContext = self.managedObjectContext;
    if (managedObjectContext != nil) {
        if ([managedObjectContext hasChanges] && ![managedObjectContext save:&error]) {
             // Replace this implementation with code to handle the error appropriately.
             // abort() causes the application to generate a crash log and terminate. You should not use this function in a shipping application, although it may be useful during development. 
            NSLog(@"Unresolved error %@, %@", error, [error userInfo]);
            abort();
        } 
    }
}

#pragma mark - Core Data stack

// Returns the managed object context for the application.
// If the context doesn't already exist, it is created and bound to the persistent store coordinator for the application.
- (NSManagedObjectContext *)managedObjectContext
{
    if (__managedObjectContext != nil) {
        return __managedObjectContext;
    }
    
    NSPersistentStoreCoordinator *coordinator = [self persistentStoreCoordinator];
    if (coordinator != nil) {
        __managedObjectContext = [[NSManagedObjectContext alloc] init];
        [__managedObjectContext setPersistentStoreCoordinator:coordinator];
    }
    return __managedObjectContext;
}

// Returns the managed object model for the application.
// If the model doesn't already exist, it is created from the application's model.
- (NSManagedObjectModel *)managedObjectModel
{
    if (__managedObjectModel != nil) {
        return __managedObjectModel;
    }
    NSURL *modelURL = [[NSBundle mainBundle] URLForResource:@"testApp" withExtension:@"momd"];
    __managedObjectModel = [[NSManagedObjectModel alloc] initWithContentsOfURL:modelURL];
    return __managedObjectModel;
}

// Returns the persistent store coordinator for the application.
// If the coordinator doesn't already exist, it is created and the application's store added to it.
- (NSPersistentStoreCoordinator *)persistentStoreCoordinator
{
    if (__persistentStoreCoordinator != nil) {
        return __persistentStoreCoordinator;
    }
    
    NSURL *storeURL = [[self applicationDocumentsDirectory] URLByAppendingPathComponent:@"testApp.sqlite"];
    
    NSError *error = nil;
    __persistentStoreCoordinator = [[NSPersistentStoreCoordinator alloc] initWithManagedObjectModel:[self managedObjectModel]];
    if (![__persistentStoreCoordinator addPersistentStoreWithType:NSSQLiteStoreType configuration:nil URL:storeURL options:nil error:&error]) {
        /*
         Replace this implementation with code to handle the error appropriately.
         
         abort() causes the application to generate a crash log and terminate. You should not use this function in a shipping application, although it may be useful during development. 
         
         Typical reasons for an error here include:
         * The persistent store is not accessible;
         * The schema for the persistent store is incompatible with current managed object model.
         Check the error message to determine what the actual problem was.
         
         
         If the persistent store is not accessible, there is typically something wrong with the file path. Often, a file URL is pointing into the application's resources directory instead of a writeable directory.
         
         If you encounter schema incompatibility errors during development, you can reduce their frequency by:
         * Simply deleting the existing store:
         [[NSFileManager defaultManager] removeItemAtURL:storeURL error:nil]
         
         * Performing automatic lightweight migration by passing the following dictionary as the options parameter: 
         [NSDictionary dictionaryWithObjectsAndKeys:[NSNumber numberWithBool:YES], NSMigratePersistentStoresAutomaticallyOption, [NSNumber numberWithBool:YES], NSInferMappingModelAutomaticallyOption, nil];
         
         Lightweight migration will only work for a limited set of schema changes; consult "Core Data Model Versioning and Data Migration Programming Guide" for details.
         
         */
        NSLog(@"Unresolved error %@, %@", error, [error userInfo]);
        abort();
    }    
    
    return __persistentStoreCoordinator;
}

#pragma mark - Application's Documents directory

// Returns the URL to the application's Documents directory.
- (NSURL *)applicationDocumentsDirectory
{
    return [[[NSFileManager defaultManager] URLsForDirectory:NSDocumentDirectory inDomains:NSUserDomainMask] lastObject];
}

@end
